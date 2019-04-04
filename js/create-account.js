$(document).ready(function () {
  $("#signUpButton").click(signUp);
  $("#signUpButtonGoogle").click(signUpGoogle);
  $("#signUpButtonFacebook").click(signUpFacebook);
});

function signUp (event) {
  event.preventDefault();

  const email = $("#signUpEmail").val()
  const password = $("#signUpPassword").val()
  
  createUser(email, password)
}

function createUser(){
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      const userId = response.user.uid;
      redirectToFormProfile(userId)
    })
    .catch(function(error) {
    handleErrors(error)
  });
}

function signUpGoogle () {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithPopup(provider)
};

function signUpFacebook () {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInWithPopup(provider)
  
}

function signInWithPopup(provider) {
  firebase.auth().signInWithPopup(provider).then(function(response) {
    const token = response.credential.accessToken;
    const userId = response.user;
    redirectToFormProfile(userId)

  }).catch(function(error) {
    console.log(error )
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
}


function handleErrors(error){
  const errorMessage = error.message;
  alert(errorMessage)
}

function redirectToFormProfile(userId){
  window.location = "form-profile.html?id=" + userId;
}