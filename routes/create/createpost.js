var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//POST
router.get(`/`,function(req,res,next){
  knex.raw(`SELECT users.id as userid, posts.id as postid, users.name, users.password, users.logged_in, posts.content FROM users JOIN posts ON users.id = posts.id`).then(function(data){
    res.render('create/post',{
      data: data
    })
  })
})




// router.post('/index/create', function(req,res,next){
//   knex.raw(`SELECT * from users JOIN posts ON `)
//
//   knex.raw(`INSERT into posts VALUES (DEFAULT,${req.cookies.useridxxxxx},)`).then(function(data){
//     res.render('post',{
//
//     })
//   })
// })
//
//
//
// router.post('/index/create',function(req,res,next){
//   knex.raw(`SELECT * from users JOIN posts ON `)
//
//   knex.raw(`INSERT into posts VALUES (DEFAULT,${req.cookies.userid},)`).then(function(data){
//     res.render('post',{
//
//     })
//   })
// })

module.exports = router;
