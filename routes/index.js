var express = require('express');
var router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login to Placebook
router.post('/', function(req, res, next) {

  knex('users').select()
               .where('name', req.body.usrName)
               .then(function(user){
                 if(user[0]) {
                   bcrypt.compare(req.body.password, user[0].password, function(err, result){
                     if(result) {
                       res.cookie("id", user[0].id)
                       res.cookie("loggedin", true);
                       console.log(req.cookies.loggedin)
                       knex.raw('update users set logged_in = ? where name = ?;', [true, req.body.usrName]).then(() =>{
                       console.log("hi")
                       res.redirect('/top')
                     })

                   } else {
                     res.redirect('/')
                   }
                 });
                 } else {
                   res.redirect('/')
                 }

               })

});

//Register for Placebook
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', (req, res, next) =>{
  bcrypt.genSalt(saltRounds, (err, salt) =>{
    bcrypt.hash(req.body.password, salt, (err, hash) =>{
      knex('users').insert({
                            name: req.body.usrName,
                            password: hash
                            })
                            .then(function(){
                              res.redirect('/')
                            });
    });
  });
});

module.exports = router;
