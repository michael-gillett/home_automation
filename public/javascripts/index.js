
$(function() {
  $('.btn').click(function() {
    var query = $('.query').val();
    $.post('/query', {query: query}, function(data) {
      $('.result').text(JSON.stringify(data.outcomes[0], null, 2))
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
    $(this).toggleClass('record-start record-stop')
    $.post('/record-stop', function(data) {
      console.log("recording stopped")
      $('.result').text(JSON.stringify(data.outcomes[0], null, 2))
    })
  })
})
