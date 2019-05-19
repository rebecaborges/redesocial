const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getDatabasePosts();
});

function getDatabasePosts() {
  database.ref(`posts/${USER_ID}`).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().posts;
      
        showDatabasePosts(childKey, childData)
      });
    });
};

function createTemplates(childKey, childData) {
  const user = firebase.auth().currentUser
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" 
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <section class="card border mb-3 show-post" style="max-width: 40rem;">
      <header class="card-header bg-transparent border text-card"></header>
      <article class="card-body text-card">
      <p class="card-text" data-texto-id="${childKey}">${childData}</p>
      </article>
      <footer class="card-footer bg-transparent border">
      <button data-like="${childKey}" type="button" class="like btn btn-style">
        Curtir <span data-counter="${childKey}" class="counter badge badge-light"></span>
      </button>
      <button class="btn btn-style" data-edit="${childKey}">Editar</button>
      <button class="btn btn-style" data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      </footer>
    </section>`)
}

function showDatabasePosts(childKey, childData) {
    createTemplates(childKey, childData)

};