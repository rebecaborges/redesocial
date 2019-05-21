const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getDatabasePosts();
});

function getDatabasePosts() {
  database.ref(`profile`).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const childData = childSnapshot;
        const user = childData.val().userName
        
        showDatabasePosts(user)
        
      });
    });
};

function createTemplates(user) {
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" 
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <section class="card border mb-3 show-post" style="max-width: 40rem;">
      <header class="card-header bg-transparent border text-card"></header>
      <article class="card-body text-card">
      <p class="card-text">${user}</p>
      </article>
      <footer class="card-footer bg-transparent border">
      </footer>
    </section>`)
}

function showDatabasePosts(childData) {
    createTemplates(childData)

};

function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}

document.querySelector("#signOut").addEventListener("click", signOut)
function signOut() {
  firebase.auth().signOut().then(function() {
    window.location = `index.html`;
  }, function(error) {
    console.error('Sign Out Error', error);
  });;
}