var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

//GET ALL POSTS
router.get(`/`,function(req,res,next){
   knex.raw(`SELECT * from posts  `)
   .then (function(data){
   res.render('top/top', {
         data: data.rows
      });
   });
});


module.exports = router;
