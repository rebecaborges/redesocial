const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getDatabasePosts();

  $("#filterPostsSelect").on("change", () => {
    if (document.querySelector("#filterPostsSelect").selectedIndex ===0){
     getDatabasePosts(true || false)
    }
    else if (document.querySelector("#filterPostsSelect").selectedIndex ===1) {
     getDatabasePosts(true)
      //console.log("public")
    }
    else if (document.querySelector("#filterPostsSelect").selectedIndex ===2){
      getDatabasePosts(false)
    }
  });

  $("#sendPost").on("click", () => {
    getDatabasePosts();
    if ($("#select").val() === "public") {
      sendPostToDatabase(true);
    } else if ($("#select").val() === "private") {
      sendPostToDatabase(false);
    }
    $("#select").val($("#select").data("default-value"))
  });

  const text = $('#textAreaPost');
  text.on('change drop keydown cut paste', function() {
    text.height('auto');
	  text.height(text.prop('scrollHeight'));
  });




  // if ($("#filterPostSelect").val() === "all") {
  //   console.log("all")
  // } else if ($("#filterPostSelect".val() === "public")){
  //   console.log("public")
  // }
  // else if ($("#filterPostSelect".val() === "private")){
  //   console.log("private")
  // }
})

function getDatabasePosts(verdadeiroOuFalso) {
  database.ref(`posts/${USER_ID}`).once('value')
    .then(function (snapshot) {
      clear()
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;

        const childData = childSnapshot.val().posts;
        const likes = childSnapshot.val().likes;
        const privacy = childSnapshot.val().public;
        //const booleano = true && false
        showDatabasePosts(childKey, childData, likes, privacy, verdadeiroOuFalso)
        
        $(`#${childKey}`).on("click", () => {
          const deletePosts = confirm("Excluir post?")
          if (deletePosts === true) removePosts(childKey)
        }
        );

        $(`button[data-edit="${childKey}"]`).on("click", ()=>{
          editPost(childKey)
        }) 

        $(`button[data-like="${childKey}"]`).on("click", ()=>{
         likePost(childKey)
        });
      });
    });
};

function likePost(childKey){
  let counter = parseInt($(`span[data-counter="${childKey}"]`).text());
  counter++
  $(`span[data-counter="${childKey}"]`).text(counter)
  database.ref(`posts/${USER_ID}/${childKey}`).update({
    likes: counter
  })
}

function editPost(childKey){
  $(`p[data-texto-id="${childKey}"]`)
  .attr("contentEditable", "true")
  .focus()
  .blur(() => {         
    $(event.target).attr("contentEditable", "false")
    database.ref(`posts/${USER_ID}/${childKey}`).update({
      posts: $(event.target).text()
    })
  });      
}

function removePosts(key) {
  database.ref(`posts/${USER_ID}/${key}`).remove();
  getDatabasePosts();
};


function showDatabasePosts(childKey, childData, likes, privacy, verdadeiroOuFalso) {
  const user = firebase.auth().currentUser
  console.log(verdadeiroOuFalso)
  if(privacy === verdadeiroOuFalso){
  $("#postsSection").prepend(`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" 
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <section class="card border-success mb-3 show-post" style="max-width: 40rem;">
      <header class="card-header bg-transparent border-success">${user.displayName}</header>
      <aticle class="card-body text-success">
      <p class="card-text" data-texto-id="${childKey}">${childData}</p>
      </article>
      <footer class="card-footer bg-transparent border-success">
      <button data-like="${childKey}" type="button" class="like btn btn-primary">
        Curtir <span data-counter="${childKey}" class="counter badge badge-light">${likes}</span>
      </button>
      <button class="btn btn-primary" data-edit="${childKey}">Editar</button>
      <button class="btn btn-primary" data-delete="${childKey}" id="${childKey}" class="delete">Deletar</button>
      </footer>
    </section>`)
  }
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
}

function clear() {
  $("#postsSection").html("");
  $("#textAreaPost").val("");
};
