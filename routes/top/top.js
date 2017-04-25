var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//GET ALL POSTS
router.get(`/`,function(req,res,next){
   knex.raw(`SELECT *
       FROM posts JOIN users ON users.id = posts.poster_id where users.logged_in = true`)
   .then (function(data){
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
      res.render('posts/edit', {posts: data.rows[0]});
   });
});


module.exports = router;
