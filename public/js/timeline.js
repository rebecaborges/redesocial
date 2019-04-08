const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getDatabasePosts();

  $("#sendPost").on("click", () => {
    getDatabasePosts();
    if (document.querySelector("#select").selectedIndex === 1) {
      isPublic(true);
    } else if (document.querySelector("#select").selectedIndex === 2) {
      isPublic(false);
    };
    document.querySelector("#select").selectedIndex = 0;
  });

});

function getDatabasePosts() {
  database.ref(`posts/${USER_ID}`).once('value')
    .then(function (snapshot) {
      clear()
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;

        const childData = childSnapshot.val().posts;

        showDatabasePosts(childKey, childData)
        $(`#${childKey}`).on("click", () => {
          const deletePosts = confirm("Excluir post?")
          if (deletePosts === true) removePosts(childKey)
        }
        );
        $(`button[data-like="${childKey}"]`).click(function () {
          let counter = parseInt($(`span[data-counter="${childKey}"]`).text());
          counter += 1
          $(`span[data-counter="${childKey}"]`).text(counter)
          database.ref(`posts/${USER_ID}/${childKey}`).update({
            likes: counter
          })
        });
      });
    });
};

function showDatabasePosts(childKey, childData) {
  const user = firebase.auth().currentUser
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <div>
      <p>${user.displayName}</p>
      <p>${childData}</p>
      <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      <button data-edit="${childKey}">Editar</button>
      <button data-like="${childKey}" type="button" class="like btn btn-primary">
        Curtir <span data-counter="${childKey}" class="counter badge badge-light">0</span>
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

//Vai atualizar os posts no banco de dados
function updatePosts() {
  database.ref(`posts/${USER_ID}/${key}`).update();
};

//Função de editar da Paloma
//   $(`button[data-edit=${childKey}]`).click(function(){
//     $(this).nextAll("p:first").attr("contentEditable", "true").focus().blur(function(){
//       $(this).attr("contentEditable", "false")
//     })
//   })
// })

// const text = $('#post');
// text.on('change drop keydown cut paste', function() {
//   text.height('auto');
// 	text.height(text.prop('scrollHeight'));
// });
