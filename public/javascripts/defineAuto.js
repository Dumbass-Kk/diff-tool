!function(){
  'use strict'
  var $text = document.getElementById('autoText')
  var $btn = document.getElementById('autoButton')
  var $out = document.getElementById('autoOutput')
  $btn.addEventListener('click', function(){
    $out.value = $text.value.replace(/&#[\d]+;/g,'')
    $out.value = $out.value.replace(/font-family:.*?(?=;|")/g,'')
    // let formData = new FormData()
    // formData.append('text', $text.value)
    // fetch('/webAutomation/defineAuto/file', {
    //   body: formData,
    //   method: 'POST'
    // }).then((response) => {
    //   return response.json();
    // }).then((res) => {
    //   $out.value = res.data
    // })
  })
}()
