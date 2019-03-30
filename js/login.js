$(document).ready(function(){
  $("#signInButton").click(function(event){
    let email = $("#signInEmail").val()
    let password = $("#signInPassword").val()
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
     window.location= "timeline.html";
    })

    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  })
})

$("#signUpButton").click(function(){
  window.location = "create-account.html"
})