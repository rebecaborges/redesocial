$(document).ready(function () {

  $("#signUpButton").click(signUp);

  $("#signUpButtonGoogle").click(signUpGoogle);

  $("#signUpButtonFacebook").click(signUpFacebook);

});

function signUp (event) {
  const email = $("#signUpEmail").val()
  const password = $("#signUpPassword").val()
  event.preventDefault();

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {

    window.location = "form-profile.html?id=" + response.user.uid;
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
    
    }).catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
};

function signUpFacebook (e){
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    const token = result.credential.accessToken;
    const user = result.user;
    window.location= "form-profile.html";

  }).catch(function(error) {
    console.log(error )
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
}