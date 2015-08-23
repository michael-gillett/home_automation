
$(function() {
  $('.query').click(function() {
    var query = $('.query').val();
    processText(query);
  })

  $(document).on('click', '.record-start', function() {
    $.post('/record-start', function(data) {
      console.log("recording started")
    })
    $(this).toggleClass('record-start record-stop');
  })

  $(document).on('click', '.record-stop', function() {
    $.post('/record-stop', function(data) {
      $btn.children().toggleClass('fa-microphone fa-spinner fa-spin')
      displayResult(data)
    })
    $(this).toggleClass('record-start record-stop');
    $('.loading').show();
  })

  function processText(query) {
    $('.loading').show();
    $('.response').hide();
    $.post('/query', {query: query}, function(data) {
      $('.loading').hide();
      $('.response').show().text(data.res);
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
    $('#wrapper').toggleClass("toggled");
  });

  // Home page

  var lastValue;
  $('.request').focusin(function() {
    lastValue = $(this).html();
  });

  $('.request').focusout(function() {
    if (lastValue !== $(this).html()) {
      processText($(this).html());
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
