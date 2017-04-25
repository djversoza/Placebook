var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//NEW POST
//-1 GET
router.get(`/create`,function(req,res,next){
  knex.raw(`SELECT users.* FROM users WHERE users.id =${req.cookies.id} `).then(function(data){
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
router.get(`/updateacc/`,function(req,res,next){
  knex.raw(`SELECT * FROM users WHERE users.id =${req.cookies.id}`).then(function(data){
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
