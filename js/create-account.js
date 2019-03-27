$(document).ready(function () {
  $("#signUpButton").click(function (event) {
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
  })

  $("#signUpButtonGoogle").click(function () {
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
  })

})




