
$(function() {
  $('.btn').click(function() {
    var query = $('.query').val();
    $.post('/query', {query: query}, function(data) {
      $('.response').text(data.res);
      $('.result').show().text(JSON.stringify(data.raw, null, 2));
      var s_to_ms = data.time[0] * 1000;
      var ns_to_ms = data.time[1] / 1000000;
      $('.time').text(s_to_ms + ns_to_ms + 'ms');
    })
  })

  $(document).on('click', '.record-start', function() {
    console.log('start')
    $(this).toggleClass('record-start record-stop')
    $.post('/record-start', function(data) {
      console.log("recording started")
    })
  })

  $(document).on('click', '.record-stop', function() {
    console.log('stop')
    $btn = $(this)
    $btn.toggleClass('record-start record-stop')
    $btn.children().toggleClass('fa-microphone fa-spinner fa-spin')
    $.post('/record-stop', function(data) {
      console.log("recording stopped")
      $btn.children().toggleClass('fa-microphone fa-spinner fa-spin')
      $('.result').show().text(JSON.stringify(data.outcomes[0], null, 2))
    })
  })
})
