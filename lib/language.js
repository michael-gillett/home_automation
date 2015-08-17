
module.exports.plural =  function(str, num){
  var index = num == 1 ? 1 : 0;
  str = str.replace(/\[num\]/, num);

  str = str.replace(/{(.[^}]*)}/g, function(wholematch,firstmatch) {
    var values = firstmatch.split('|');
    return values[index] || '';
  });

  return str;
}

String.prototype.titleize = function() {
  var words = this.split(' ')
  var array = []
  for (var i=0; i<words.length; ++i) {
    array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1))
  }
  return array.join(' ')
}