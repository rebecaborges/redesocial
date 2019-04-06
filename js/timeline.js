const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
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
      storePostsOnDatabase();
      getDatabasePosts();
  })
});

function getDatabasePosts(){
    database.ref(`posts/${USER_ID}`).once('value')
    .then(function(snapshot){
      clear()
      snapshot.forEach(function(childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().posts;
       
        showDatabasePosts(childKey, childData)
        $(`#${childKey}`).on("click", () => removePosts(childKey));
    });
  });
}

function clear(){
    $("#postsSection").html("");
    $("#textAreaPost").val("")
}

//Botão curtir e editar estão sem função

function showDatabasePosts(childKey, childData){
    const user = firebase.auth().currentUser
    $("#postsSection").prepend(`
    <div>
      <p>${user.displayName}</p>
      <p>${childData}</p>
      <button>Curtir</button>
      <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      <button data-edit="${childKey}">Editar</button>
    </div>`)
}

function removePosts(key){
    database.ref(`posts/${USER_ID}/${key}`).remove();
    getDatabasePosts()
}

function editPosts(){
    database.ref(`posts/${USER_ID}/${key}`).update();
}

//   $(`button[data-edit=${childKey}]`).click(function(){
  //     $(this).nextAll("p:first").attr("contentEditable", "true").focus().blur(function(){
  //       $(this).attr("contentEditable", "false")
  //     })
  //   })
  // })




function storePostsOnDatabase(){
    const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
    firebase.database().ref(`posts/${USER_ID}`).push({
      posts: getPostFromTextarea()
  });
}

function getPostFromTextarea(){
    return $("#textAreaPost").val();
};
 
  // $("#sendPost").click(()=>{
  //   const user = firebase.auth().currentUser

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
