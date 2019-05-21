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

function createUser(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      redirectToFormProfile(response)
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
    redirectToFormProfile(response)

  }).catch(function(error) {
    console.log(error )
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;

    alert(errorCode, errorMessage, email, credential)
  });
}


function handleErrors(error){
  const errorMessage = error.message;
  alert(errorMessage)
}

function redirectToFormProfile(response){
  if (response.additionalUserInfo.isNewUser) {
    window.location = `form-profile.html?id=${response.user.uid}`;
  } else { window.location = `timeline.html?id=${response.user.uid}` }
}