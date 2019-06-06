const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$("#logout").click(function(){
  firebase.auth().signOut().then(function() {
    window.location = "index.html";
  }).catch(function(error) {
    alert(error)
  });
});

$(document).ready(() => {
  getDatabasePosts();
  disableButton();

  $("#filterPostsSelect").on("change", () => {
    if ($("#filterPostsSelect").val() === "all") {
      getDatabasePosts(undefined)
    } else if ($("#filterPostsSelect").val() === "public") {
      getDatabasePosts(true)
    } else if ($("#filterPostsSelect").val() === "private") {
      getDatabasePosts(false)
    }
  });

  $("#sendPost").on("click", () => {
    disableButton()
    getDatabasePosts();
    if ($("#select").val() === "selected") {
      sendPostToDatabase(true);
    } else if ($("#select").val() === "private") {
      sendPostToDatabase(false);
    };
  });

  const text = $('#textAreaPost');
  text.on('change drop keydown cut paste', function () {
    text.height('auto');
    text.height(text.prop('scrollHeight'));
  });
});

function getDatabasePosts(boolean) {
  database.ref(`posts/${USER_ID}`).once('value')
    .then(function (snapshot) {
      clear();
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().posts;
        const likes = childSnapshot.val().likes;
        const privacy = childSnapshot.val().public;

        showDatabasePosts(childKey, childData, likes, privacy, boolean)

        $(`#${childKey}`).on("click", () => {
          const deletePosts = confirm("Excluir post?")
          if (deletePosts === true) removePosts(childKey)
        });

        $(`button[data-edit="${childKey}"]`).on("click", () => {
          editPost(childKey)
        });

        $(`button[data-like="${childKey}"]`).on("click", () => {
          likePost(childKey)
        });
      });
    });
};

function createTemplates(childKey, childData, likes) {
  const user = firebase.auth().currentUser
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" 
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <section class="card border mb-3 show-post" style="max-width: 40rem;">
      <header class="card-header bg-transparent border text-card">${user.displayName}</header>
      <article class="card-body text-card">
      <p class="card-text" data-texto-id="${childKey}">${childData}</p>
      </article>
      <footer class="card-footer bg-transparent border">
      <button data-like="${childKey}" type="button" class="like btn btn-style">
        Curtir <span data-counter="${childKey}" class="counter badge badge-light">${likes}</span>
      </button>
      <button class="btn btn-style" data-edit="${childKey}">Editar</button>
      <button class="btn btn-style" data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      </footer>
    </section>`)
}

function likePost(childKey) {
  let counter = parseInt($(`span[data-counter="${childKey}"]`).text());
  counter++
  $(`span[data-counter="${childKey}"]`).text(counter)
  database.ref(`posts/${USER_ID}/${childKey}`).update({
    likes: counter
  });
};

function editPost(childKey) {
  $(`p[data-texto-id="${childKey}"]`)
    .attr("contentEditable", "true")
    .focus()
    .blur(() => {
      $(event.target).attr("contentEditable", "false")
      database.ref(`posts/${USER_ID}/${childKey}`).update({
        posts: $(event.target).text()
      });
    });
};

function showDatabasePosts(childKey, childData, likes, privacy, boolean) {
  if (privacy === boolean) {
    createTemplates(childKey, childData, likes)
  }
  else if (boolean === undefined) {
    createTemplates(childKey, childData, likes)
  };
};

function getPostFromTextarea() {
  return $("#textAreaPost").val();
};

function sendPostToDatabase(publicOrPrivate) {
  firebase.database().ref(`posts/${USER_ID}/`).push({
    posts: getPostFromTextarea(),
    public: publicOrPrivate,
    likes: 0
  });
};

function removePosts(key) {
  database.ref(`posts/${USER_ID}/${key}`).remove();
  getDatabasePosts();
};

function disableButton() {
  $("#sendPost").prop("disabled", true)
  $('#textAreaPost').on("input", function () {
    if ((this).val != "") {
      $("#sendPost").prop("disabled", !$(this).val().length)
    };
  });
};

function clear() {
  $("#postsSection").html("");
  $("#textAreaPost").val("");
};
