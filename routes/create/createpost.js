var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//NEW POST
//-1 GET
router.get(`/create`,function(req,res,next){
  knex.raw(`SELECT users.id as userid, posts.id as postid, users.name, users.password, users.logged_in, posts.content FROM users JOIN posts ON users.id = posts.poster_id WHERE users.logged_in='true'`).then(function(data){
    res.render('create/post',{
      data: data.rows[0]
    })
  })
})

//-2 POST
router.post('/:id',function(req,res,next){

  knex.raw(`INSERT into posts VALUES (DEFAULT,${req.params.id},'${req.body.content}')`).then(function(){
    res.render('create/confirmpost',{
      id: `${req.params.id}`,
      content: `${req.body.content}`
    })
  })
})


//UPDATE ACCOUNT
//-1 GET
router.get(`/updateacc/:id`,function(req,res,next){
  knex.raw(`SELECT * FROM users WHERE logged_in='true'`).then(function(data){
    res.render('create/edit',{
      data: data.rows[0]
    })
  })
})

//-2 POST
router.post('/updateacc/post/:id',function(req,res,next){
  knex.raw(`UPDATE users SET name='${req.body.name}', password='${req.body.password}' WHERE id=${req.params.id}`).then(function(){
    res.redirect('/createpost/create')
  })
})

module.exports = router;
