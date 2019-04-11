$(document).ready(function () {
  $('#saveProfileBtn').click(function (event) {
    event.preventDefault()
    const user = firebase.auth().currentUser
    let name = $('#name').val()

    user.updateProfile({
      displayName: name
    })
    firebase.database().ref(`profile/${user.uid}"`).update({
      surname: $('#surname').val(),
      profession: $('#profession').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      birthDate: $('#birthDate').val(),
      userName: $('#userName').val()
    }).then(function () {
      window.location = `timeline.html?id=${user.uid}`;
    });
  });
});












