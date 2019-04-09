const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getDatabasePosts();

  $("#sendPost").on("click", () => {
    getDatabasePosts();
    if ($("#select").val() === "public") {
      isPublic(true);
    } else if ($("#select").val() === "private") {
      isPublic(false);
    }
    $("#select").val($("#select").data("default-value"))
  });

  const text = $('#textAreaPost');
  text.on('change drop keydown cut paste', function() {
    text.height('auto');
	  text.height(text.prop('scrollHeight'));
  });

});

function getDatabasePosts() {
  database.ref(`posts/${USER_ID}`).once('value')
    .then(function (snapshot) {
      clear()
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;

        const childData = childSnapshot.val().posts;
        const likes = childSnapshot.val().likes;
        showDatabasePosts(childKey, childData, likes)
        
        $(`#${childKey}`).on("click", () => {
          const deletePosts = confirm("Excluir post?")
          if (deletePosts === true) removePosts(childKey)
        }
        );

        $(`button[data-edit="${childKey}"]`).click(()=>{ 
          $(`p[data-texto-id="${childKey}"]`)
            .attr("contentEditable", "true")
            .focus()
            .blur(() => {         
              $(event.target).attr("contentEditable", "false")
              database.ref(`posts/${USER_ID}/${childKey}`).update({
                posts: $(event.target).text()
              })
            });        
        })

        $(`button[data-like="${childKey}"]`).click(function () {
          let counter = parseInt($(`span[data-counter="${childKey}"]`).text());
          counter++
          $(`span[data-counter="${childKey}"]`).text(counter)
          database.ref(`posts/${USER_ID}/${childKey}`).update({
            likes: counter
          })
        });
      });
    });
};

function showDatabasePosts(childKey, childData, likes) {
  const user = firebase.auth().currentUser
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <div>
      <p>${user.displayName}</p>
      <p data-texto-id="${childKey}">${childData}</p>
      <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      <button data-edit="${childKey}">Editar</button>
      <button data-like="${childKey}" type="button" class="like btn btn-primary">
        Curtir <span data-counter="${childKey}" class="counter badge badge-light">${likes}</span>
      </button>
    </div>`)

};

function getPostFromTextarea() {
  return $("#textAreaPost").val();
};

function isPublic(publicOrPrivate) {
  firebase.database().ref(`posts/${USER_ID}/`).push({
    posts: getPostFromTextarea(),
    public: publicOrPrivate,
    likes: 0
  });
};

function clear() {
  $("#postsSection").html("");
  $("#textAreaPost").val("");
};

function removePosts(key) {
  database.ref(`posts/${USER_ID}/${key}`).remove();
  getDatabasePosts();
};