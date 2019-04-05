$(document).ready(function () {
  $('#saveProfileBtn').click(function (event) {
    const user = firebase.auth().currentUser
    event.preventDefault()

    let name = $('#name').val()
  
  user.updateProfile({
    displayName: name
  })
  console.log(user.displayName)

    firebase.database().ref(`"profile/${user.uid}"`).update({
      surname: $('#surname').val(),
      profession: $('#profession').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      birthDate: $('#birthDate').val(),
      userName: $('#userName').val()
    }).then(function () {
      window.location = `timeline.html?id=${user.uid}`;
    })
  });
})

// function updateProfile(){
//   let name = $('#name').val()
//   const user = firebase.auth().currentUser
//   user.updateProfile({
//     displayName: name
//   })
//   console.log(user.displayName)
// }











