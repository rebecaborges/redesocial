const database = firebase.database();

$(document).ready(function () {

  $("#sendPost").click(showPosts);
  $("#sendPost").click(storePost);

  });


const text = $('#post');
text.on('change drop keydown cut paste', function() {
  text.height('auto');
	text.height(text.prop('scrollHeight'));
});

function getName(){
  const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  database.ref("profile/"+USER_ID).once('value').then(function(snapshot) {
  return snapshot.val().name;
  });      

  
};

function getPost(){
  return $("#post").val();
};

function storePost(){
  const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  const createPost = firebase.database().ref("posts/"+ USER_ID).push({
  posts: getPost()
  });
  return createPost;
};

function showPosts(){
$(".show-post").prepend(
  `<p>${getName()}</p>
  <article>${getPost()}</article>
  <div></div>
`)};


