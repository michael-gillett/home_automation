
$(function() {
  $('.btn').click(function() {
    var query = $('.query').val();
    $.post('/query', {query: query}, function(data) {
      displayResult(data);
    })
  })

  $(document).on('click', '.record-start', function() {
    $(this).toggleClass('record-start record-stop')
    $(this).children().toggleClass('fa-microphone fa-stop')
    $.post('/record-start', function(data) {
      console.log("recording started")
    })
  })

  $(document).on('click', '.record-stop', function() {
    $btn = $(this)
    $btn.toggleClass('record-start record-stop')
    $btn.children().toggleClass('fa-stop fa-spinner fa-spin')
    $.post('/record-stop', function(data) {
      $btn.children().toggleClass('fa-microphone fa-spinner fa-spin')
      displayResult(data)
    })
  })

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
})
