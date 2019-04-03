const text = $('#post');
text.on('change drop keydown cut paste', function() {
  text.height('auto');
	text.height(text.prop('scrollHeight'));
});


$("#sendPost").click(function(event){
  const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  event.preventDefault()
  const post = $("#post").val();
  const postText = $(".show-post")

  postText.prepend(`<ul><li>${post}</li></ul>`)
  $("#post").val('');
  firebase.database().ref("posts/"+ USER_ID).push({
    posts: post
  })

});


