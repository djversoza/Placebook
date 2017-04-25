var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//NEW POST
//-1 GET
router.get(`/create`,function(req,res,next){
  knex.raw(`SELECT users.id as userid, posts.id as postid, users.name, users.password, users.logged_in, posts.content FROM users JOIN posts ON users.id = posts.poster_id`).then(function(data){
    res.render('create/post',{
      data: data.rows
    })
  })
})

//-2 POST
router.post('/',function(req,res,next){
  knex.raw(`INSERT into posts VALUES (DEFAULT,${req.body.userid},'${req.body.content}')`).then(function(){
    res.redirect('/createpost/create')
  })
})

//UPDATE ACCOUNT
//-1 GET
router.get(`/updateacc/:id`,function(req,res,next){
  knex.raw(`SELECT users.* FROM users WHERE users.id=${req.params.id}`).then(function(data){
    res.render('create/edit',{
      data: data.rows[0]
    })
  })
})

//-2 POST
router.post('/updateacc/:id',function(req,res,next){
  knex.raw(`UPDATE users SET name='${req.body.name}', password='${req.body.password}' WHERE id=${req.params.id}`).then(function(){
    res.redirect('/createpost/create')
  })
})

module.exports = router;
