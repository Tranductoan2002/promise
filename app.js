var users = [
    {
        id:1,
        name:'đức toàn'
    },
    {
        id:2,
        name:'sơn đặng'
    },
    {
        id:3,
        name:'hưng đàm'
    }
];
var comments =[
    {
        id:1,
        users_id:1,
        contens:'anh sơn chưa ra video'
    },
    {
        id:2,
        users_id:2,
        contens:'vừa ra xong em ơi'
    }
];
// lấy comment 
//từ comment lấy ra user_id
//từ user_id lấy ra trường tương ứng
function getComment(){
    return new Promise(function(resolve){
        setTimeout(function(){
           resolve(comments);
        },1000)
    });
};
function getUsersById(userIds){
    return new Promise(function(resolve){
       var result = users.filter(function(user){ 
        return userIds.includes(user.id);
       })
      setTimeout(function(){
        resolve(result);
      },1000);
        
    },1000);
};
getComment()
.then(function(comments){
  var userIds = comments.map(function(comment){ 
    return comment.users_id; 
  });

  return getUsersById(userIds)
  .then(function(users){
    return {
      users: users,
      comments: comments
    };
  });
})
.then(function(data){
  var commentBlock = document.getElementById('comment-block');
  var html ='';
  data.comments.forEach(comment => {

    var user = data.users.find(user => {
      return user.id === comment.users_id; 
    });

    html +=`<li>${user.name}: ${comment.contens}</li>`;

  });

  commentBlock.innerHTML = html;
});
