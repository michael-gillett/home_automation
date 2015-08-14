
$(function() {
  $('.btn').click(function() {
    var query = $('.query').val();
    $.post('/query', {query: query}, function(data) {
      $('.result').text(JSON.stringify(data.outcomes[0], null, 2))
    })
  })
})