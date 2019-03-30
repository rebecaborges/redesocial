$(document).ready(function () {

  $("#signUpButton").click(signUp);

  $("#signUpButtonGoogle").click(signUpGoogle);

  $("#signUpButtonFacebook").click(signUpFacebook);

});

function signUp (event) {
  const email = $("#signUpEmail").val()
  const password = $("#signUpPassword").val()
  event.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    window.location = "form-perfil.html";
  })

  .catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
}

function signUpGoogle () {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    const token = result.credential.accessToken;
    const user = result.user;
    window.location = "form-perfil.html";

  }).catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
};

function signUpFacebook (e){
  e.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    window.location= "form-perfil.html";

  }).catch(function(error) {
    console.log(error )
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}