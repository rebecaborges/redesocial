const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
//Mudar esse USER_ID para o método da Carol que fica mais bonito, eu acho rs

//Quando a página é carregada os posts do banco são trazidos
//Colocar mais coisas do document.ready com o click
//Ou aquele que a Ju mostrou, event listener do jquery
//Função da text area está desativado
//O nome não está sendo pego com display name
$(document).ready(function() {
  showDatabasePosts();
});

function showDatabasePosts(){
    // FUNCAO QUE POSTA NA TELA O QUE ESTA NO BANCO
    database.ref('posts/'+ USER_ID).once('value')
    .then(function(snapshot){
      $("#postsSection").html("");
      snapshot.forEach(function(childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().posts;
        $("#postsSection").prepend(`
        <div>
           <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
           <button data-edit="${childKey}">Editar</button>
           <p>${childData}</p>
         </div>`)
 
         document.getElementById(childKey).addEventListener("click", () => remove(childKey));
    });
  });
}

 // FUNCAO QUE REMOVE POSTS DO BANCO (SOMENTE ISSO)
function remove(key){
  database.ref(`posts/${USER_ID}/${key}`).remove();
  showDatabasePosts()
}

document.getElementById("sendPost").addEventListener("click", () => {
  gravaPostsNoBanco();
  showDatabasePosts();
})

function gravaPostsNoBanco(){
    const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
    firebase.database().ref(`posts/${USER_ID}`).push({
      posts: getPostFromTextarea()
  });
}

function getPostFromTextarea(){
    return $("#post").val();
};
 
  // $("#sendPost").click(storePost);


  // function storePost(){
  //   const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  //   const createPost = firebase.database().ref(`posts/${USER_ID}`).push({
  //     posts: getPost()
  //   });

  //   return createPost;
  // };

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
