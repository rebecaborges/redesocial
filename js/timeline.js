const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
//const public = database.ref(`posts/public/${USER_ID}`);
//const private = database.ref(`posts/private/${USER_ID}`);
//Mudar esse USER_ID para o método da Carol que fica mais bonito, eu acho rs
//Usar mais on que é o event listener do jquery
//Função do auto resize da text area está desativada, pesquisar se tem no bootstrap
//usar template string onde der pq é o certo
//Usar for in onde der
//Usar mais arrow functions
//Não permitir posts em branco
//Substituir os templates pelos seus respectivos ícones, lixeira, coração e caneta
//Função editar dando pau, só funcionava na versão com bugs e acho que vai ter que mudar a lógica pra ela voltar a funcionar
$(document).ready(() => {
  getDatabasePosts();

  $("#sendPost").on("click", () => {
     if(document.querySelector("#select").selectedIndex === 1){
      isPublic(true);

     }else if (document.querySelector("#select").selectedIndex === 2){
       isPublic(false);
     }
    
     document.querySelector("#select").selectedIndex = 0;
  })

  // $(".change-select").on("change",() => {
  //   if(document.querySelector("#select").selectedIndex ===1){
  //     changePublic();
  //     $(".icon");
  //   }else if(document.querySelector("#select").selectedIndex ===2){
  //     changePublic(private);
  //   }
  // })
})





// function getDatabasePostsPublic() {
//   database.ref(`posts/public/${USER_ID}`).once('value')
//     .then(function (snapshot) {
//       clear()
//       snapshot.forEach(function (childSnapshot) {
//         const childKey = childSnapshot.key;
//         console.log(childKey)
//         const childData = childSnapshot.val().posts;
//         console.log(childData)

//         showDatabasePosts(childKey, childData)
//         $(`#${childKey}`).on("click", () => removePostsPublic(childKey) 
        
//         );
//       });
//     });
// }


function getDatabasePosts() {
  database.ref(`posts/public,private/${USER_ID}`).once('value')
    .then(function (snapshot) {
      clear()
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        console.log(childKey)
        const childData = childSnapshot.val().posts;
        console.log(childData)

        showDatabasePosts(childKey, childData)
        $(`#${childKey}`).on("click", () => removePosts(childKey)
        
        );
      });
    });
}

function getPostFromTextarea() {
  return $("#textAreaPost").val();
};

//Botão curtir e editar estão sem função

function showDatabasePosts(childKey, childData) {
  const user = firebase.auth().currentUser
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <div>
      <p>${user.displayName}</p>
      <p>${childData}</p>
      <button>Curtir</button>
      <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      <button data-edit="${childKey}">Editar</button>
    </div>`)
}

function isPublic(publicOrPrivate){
  USER_ID
  firebase.database().ref(`posts/${USER_ID}/`).push({
    posts: getPostFromTextarea(),
    public : publicOrPrivate
  });
}

function changePrivate (){
  USER_ID
  firebase.database().ref(`posts/private/${USER_ID}`).push({
    posts: getPostFromTextarea()
  });
}


// function storePostsOnDatabase() {
//   const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
//   firebase.database().ref(`posts/${USER_ID}`).push({
//     posts: getPostFromTextarea()
//   });
// }


function clear() {
  $("#postsSection").html("");
  $("#textAreaPost").val("")
}

function removePosts(key) {
  database.ref(`public,private/${USER_ID}/${key}`).remove();
  getDatabasePostsPublic();
}

// function removePostsPrivate(key) {
//   database.ref(`posts/private/${USER_ID}/${key}`).remove();
//   getDatabasePostsPrivate();
// }




//Vai editar os posts na tela/in place
function editPosts() {

}

//Vai atualizar os posts no banco de dados
function updatePosts() {
  database.ref(`posts/${USER_ID}/${key}`).update();
}

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
