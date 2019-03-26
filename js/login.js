$(document).ready(function(){
  $("#signButton").click(function(){
    let email = $("#signEmail")
    let password = $("#signEmail")

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  })
})
