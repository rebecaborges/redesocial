$(document).ready(function () {
  $('#saveProfileBtn').click(function (event) {
    event.preventDefault();
    firebase.database().ref("users/profile/").push({
      name: $('#name').val(),
      surname: $('#surname').val(),
      profession: $('#profession').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      birthDate: $('#birthDate').val(),
      userName: $('#userName').val()
    }).then(() => {
      alert("Conta criada com sucesso")
      window.location = "timeline.html"
    });
  });
})









