const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
//Mudar esse USER_ID para o método da Carol que fica mais bonito, eu acho rs
//Colocar mais coisas do document.ready com o click
//Usar mais on que é o event listener do jquery
//Função do auto resize da text area está desativada, pesquisar se tem no bootstrap
//O nome não está sendo pego com display name
//usar template string onde der pq é o certo
//Usar for in onde der
//Usar mais arrow functions
$(document).ready(function() {
    getDatabasePosts();
});

function getDatabasePosts(){
    database.ref(`posts/${USER_ID}`).once('value')
    .then(function(snapshot){
      clear()
      snapshot.forEach(function(childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().posts;
       
        showDatabasePosts(childKey, childData)
         document.getElementById(childKey).addEventListener("click", () => remove(childKey));
    });
  });
}

function clear(){
    $("#postsSection").html("");
    $("#textAreaPost").val("")
}

function showDatabasePosts(childKey, childData){
    $("#postsSection").prepend(`
    <div>
      <button data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      <button data-edit="${childKey}">Editar</button>
      <p>${childData}</p>
    </div>`)
}

function remove(key){
    database.ref(`posts/${USER_ID}/${key}`).remove();
    getDatabasePosts()
}

$("#sendPost").on("click", () => {
    storePostsOnDatabase();
    getDatabasePosts();
})

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
