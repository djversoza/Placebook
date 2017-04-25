var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//GET ALL POSTS
router.get(`/`,function(req,res,next){
   knex.raw(`SELECT posts.*
       FROM posts JOIN users ON users.id = posts.poster_id where posts.poster_id = ${req.cookies.id}`)
   .then (function(data){
      console.log("hi",data.rows)
   res.render('top/top', {
         data: data.rows  })

})
});
// post for edit option


/* GET one. */
router.get('/:id/edit', function(req, res, next) {
   knex.raw(`SELECT * from posts WHERE id =
   '${req.params.id}'`)
   .then (function(data){
      res.render('top/edit', {posts: data.rows[0]});
   });
});


//-POST ONE
router.post('/:id',function(req,res,next){
  console.log(`${req.body.content}`);
  knex.raw(`INSERT into posts VALUES (DEFAULT,${req.params.id},'${req.body.content}')`).then(function(){
    res.redirect('/createpost/create')
  })
})


//-2 POST


//UPDATE ACCOUNT
//-1 GET
router.get(`/updateacc/:id`,function(req,res,next){
  knex.raw(`SELECT * FROM users WHERE logged_in='true'`).then(function(data){
    res.render('top/edit',{
      data: data.rows[0]
    })
  })
})

router.post('/updateacc/post/:id',function(req,res,next){
  knex.raw(`UPDATE users SET name='${req.body.name}', password='${req.body.password}' WHERE id=${req.params.id}`).then(function(){
    res.redirect('/createpost/create')
  })
})

//Logout route - DJ
router.get('/logout', (req, res, next) => {
  res.clearCookie('loggedin');
  res.clearCookie('id');
  knex.raw('UPDATE users SET logged_in = false where logged_in = true').then(()=>{
    res.redirect('/')
  });

});

module.exports = router;








module.exports = router;
