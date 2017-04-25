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
                     res.cookie('loggedIn', 'true')
                     knex.raw('update users set logged_in = ? where name = ?', [req.cookies.loggedIn, req.body.usrName]).then(() =>{
                       res.redirect('/')
                     })

                   } else {
                     res.render('register')
                   }
                 });
                 } else {
                   res.render('register')
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
