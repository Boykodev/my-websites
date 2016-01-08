var wrapper = $('<div/>').css({height:0,width:0,'overflow':'hidden'});
var fileInput = $(':file').wrap(wrapper);

fileInput.change(function(){
    $this = $(this);
    var path = $this.val();
    var filename = path.replace(/^.*\\/, '');
    if (filename.length == 0) filename = 'Upload file';
    $('#file').text(filename);
})

$('#file').click(function(){
    fileInput.click();
}).show();

// Thanks OP http://stackoverflow.com/questions/22087076
// for this fantastic function
function previewFile(){
  var preview = document.querySelector('img'); //selects the query named img
  var file    = document.querySelector('input[type=file]').files[0]; //sames as here
  var reader  = new FileReader();

  reader.onloadend = function () {
     preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "";
  }
}

function set(effect, value) {
  var change = effect + '(' + value + ')';
  $('#image').css('-webkit-filter', change);
}

function setOpacity(value) {
  value = Math.abs(100 - value);
  $('#image').css('-webkit-filter', 'opacity(' + value + '%)');
}