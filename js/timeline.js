const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  trazPostsDoBanco();
});

function trazPostsDoBanco(){
    // FUNCAO QUE POSTA NA TELA O QUE ESTA NO BANCO
    database.ref('posts/'+ USER_ID).once('value')
    .then(function(snapshot){
      $("#esthe").html("");
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val().posts;
        $("#esthe").prepend(`
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
  trazPostsDoBanco()
}

document.getElementById("sendPost").addEventListener("click", () => {
  gravaPostsNoBanco();
  trazPostsDoBanco();
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
