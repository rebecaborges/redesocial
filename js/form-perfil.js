$(document).ready(function(){
 $('#saveProfileBtn').click(function(event){
  const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
    event.preventDefault()
    firebase.database().ref("profile/" + USER_ID).update({
    name: $('#name').val(),
    surname: $('#surname').val(),
    profession: $('#profession').val(),
    city: $('#city').val(),
    state: $('#state').val(),
    birthDate: $('#birthDate').val(),
    userName: $('#userName').val()  
  }).then(function () {
    window.location = "timeline.html?id=";
})
 });
})









