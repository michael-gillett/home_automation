
$(function() {
  $('.query-btn').click(function() {
    var query = $('.query').val();
    $('.results').hide();
    $('.loading').show();
    $.post('/query', {query: query}, function(data) {
      $('.loading').hide();
      $('.results').show();
      displayResult(data);
    });
  })

  $('.results').hide();

  $(document).on('click', '.record-start', function() {
    $(this).toggleClass('record-start record-stop');
    $.post('/record-start', function(data) {
      console.log("recording started")
    });
  })

  $(document).on('click', '.record-stop', function() {
    $(this).toggleClass('record-start record-stop');
    $('.help').hide();
    $('.results').hide();
    $('.loading').show();
    $.post('/record-stop', function(data) {
      $('.loading').hide();
      $('.results').show();
      $('.request').text(data.raw._text);
      $('.response').show().text(data.res);
    });
  })

  function processText(query) {
    $('.loading').show();
    $('.response').hide();
    $.post('/query', {query: query}, function(data) {
      $('.loading').hide();
      $('.response').show().text(data.res);
      $('.results').show();
    });
  }

  function displayResult(data) {
    $('.response').text(data.res);
    $('.result').show().text(JSON.stringify(data.raw, null, 2));
    var s_to_ms = data.time[0] * 1000;
    var ns_to_ms = data.time[1] / 1000000;
    $('.time').text(s_to_ms + ns_to_ms + 'ms');
  }

  $('.toggle').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('fa-bars fa-times');
    $('#wrapper').toggleClass("toggled");
  });

  // Home page

  var lastValue;
  $('.request').focusin(function() {
    lastValue = $(this).text();
  });

  $('.request').focusout(function() {
    if (lastValue !== $(this).text()) {
      processText($(this).text());
    }
  });

  // Lights page

  $("#flat").spectrum({
    flat: true,
    showInput: false,
    preferredFormat: "rgb",
    showButtons: false,
  });

  $("#flat").on("dragstop.spectrum", function(e, color) {
    var c = color.toRgb();
    var rgb = [c.r, c.g, c.b];

    var data = {
      method: "set",
      c1: rgb
    }

    $.post('/photon', {data: JSON.stringify(data)}, function(res) {
      console.log(res);
    });
  });
})
