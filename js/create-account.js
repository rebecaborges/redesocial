$(document).ready(function(){
  $("#signUpButton").click(function(event){
    let email = $("#signUpEmail").val()
    let password = $("#signUpPassword").val()
    event.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
     window.location= "timeline.html";
    })

    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  })
})


 