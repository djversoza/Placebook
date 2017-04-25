var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

/* GET ALL  home page. */
router.get('/', function(req, res, next) {
  res.render('top/top', { title: 'list of locations`' });
});

//GET ALL
router.get('/top/top', function(req, res, next) {
//   knex.raw(`SELECT * from posts WHERE poster_id = ('${req.params.id}')`)
   knex.raw(`SELECT * from posts WHERE poster_id = ('${1}')`)
   .then (function(data){
      res.render('top/top', {posts: data.rows});
   });
});

module.exports = router;  
