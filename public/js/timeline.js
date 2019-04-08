const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
//Mudar esse USER_ID para o método da Carol que fica mais bonito, eu acho rs
//Função do auto resize da text area está desativada, pesquisar se tem no bootstrap
//Usar for in onde der
//Não permitir posts em branco
//Substituir os templates pelos seus respectivos ícones, lixeira, coração e caneta
//Função editar bugada
//Botão curtir está sem função
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
          if (deletePosts === true)removePosts(childKey)
        }
        );
        $(`button[data-esthe="${childKey}"]`).click(function(event){
          let iana = parseInt($(`span[data-iana="${childKey}"]`).text());
          iana += 1
          $(`span[data-iana="${childKey}"]`).text(iana)
      
        });


      });
    });
};

function getPostFromTextarea() {
  return $("#textAreaPost").val();
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
      <button data-esthe="${childKey}" type="button" class="like btn btn-primary">
        Curtir <span data-iana="${childKey}" class="counter badge badge-light">0</span>
      </button>
    </div>`)

};


  

function isPublic(publicOrPrivate) {
  firebase.database().ref(`posts/${USER_ID}/`).push({
    posts: getPostFromTextarea(),
    public: publicOrPrivate
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

//Vai editar os posts na tela/in place
function editPosts() {
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

  // $(".show-post").prepend(`<div>
  //     <p>${user.displayName}</p>
  //     <button data-delete="${childKey}" class="delete">Deletar</button>
  //     <button data-edit="${childKey}">Editar</button>
  //     <p>${getPost()}</p>
  //   </div>`)

  //   $(".delete").click(function(){
  //     // console.log(childKey)
  //     $(this).parent().remove();
  //     database.ref(`posts/${USER_ID}/${childKey}`).remove();

  //   })
  //   $(`button[data-edit=${childKey}]`).click(function(){
  //     $(this).nextAll("p:first").attr("contentEditable", "true").focus().blur(function(){
  //       $(this).attr("contentEditable", "false")
  //     })
  //   })
  // })

// $("#sendPost").click(var user = firebase.auth().currentUser {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     // var email = user.email;
//     // var emailVerified = user.emailVerified;
//     // var photoURL = user.photoURL;
//     // var isAnonymous = user.isAnonymous;
//     // var uid = user.uid;
//     // var providerData = user.providerData;
//    $(".show-post").prepend(`<p>${displayName}</p>`)
//   } else {
//     // User is signed out.
//     // ...
//   }
// }))


// const text = $('#post');
// text.on('change drop keydown cut paste', function() {
//   text.height('auto');
// 	text.height(text.prop('scrollHeight'));
// });
