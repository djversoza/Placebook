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
  console.log(`${req.body.date}`)
  knex.raw(`INSERT into posts VALUES (DEFAULT,${req.params.id},'${req.body.content}', '${req.body.info}', '${req.body.location}','${req.body.date[0]+"/"+req.body.date[1]+"/"+req.body.date[2]}' , '${req.body.password}')`).then(function(){
    res.render('create/confirmpost',{
      id: `${req.params.id}`,
      content: `${req.body.content}`,
      pass: `${req.body.password}`,
      location: `${req.body.location}`,
      title:`${req.body.info}`,
      date: `${req.body.date[0]+"/"+req.body.date[1]+"/"+req.body.date[2]}`
    })
  })
})

//Edit post from new post page
//1 GET
router.get(`/updatepost`, function(req,res,next){
  knex.raw(`SELECT * FROM posts`).then(function(data){
    res.render('create/editpost',{
      data: data.rows
    })
  })
})

//2UPDATE
router.post('/magicishappening/:postnumber',function(req,res,next){
  knex.raw(`UPDATE posts SET content='${req.body.content}', post_pass='${req.body.post_pass}', location = '${req.body.location}',dates='${req.body.date[0]+"/"+req.body.date[1]+"/"+req.body.date[2]}' WHERE id=${req.params.postnumber}`).then(function(){
    res.redirect('/top')
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
  knex.raw(`UPDATE users SET name='${req.body.name}' WHERE id=${req.params.id}`).then(function(){
    res.redirect('/top')
  })
})

//DELETE ACCOUNT
router.get('/updateacc/delete',function(req,res,next){
  var delete1 = knex.raw(`DELETE FROM users WHERE id=${req.cookies.id}`);
  var delete2 = knex.raw(`DELETE FROM posts WHERE poster_id=${req.cookies.id}`)

  Promise.all([delete1,delete2]).then(function(){
    res.redirect('/')
  })
})

module.exports = router;
