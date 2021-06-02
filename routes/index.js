var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT*FROM users',function (err,rows){
    if (err) throw err;

    console.log(rows);
    res.render('index', {users:rows});
  });
});

router.post('/addUser',function (req,res){
  const userdata = {

    name:req.body.name,
    city:req.body.city,
    email:req.body.email,
    prof:req.body.prof

  };

  connection.query("INSERT INTO users SET ?", userdata,function (err,result) {

    if(err) throw err;
    res.redirect('/');

  });
});

router.get('/deleteUser/:id',function (req,res) {
  var userid = req.params.id;
 
  connection.query("DELETE FROM users WHERE id = ?",[userid],function (err,rows) {
    if(err) throw err;
    res.redirect('/')
  });

});

router.get('/edit/:id',function (req,res) {
  var userid = req.params.id;
  connection.query("SELECT * FROM users WHERE id = ?",[userid],function (err,rows) {
    if(err) throw err;
    res.render('edit', {userdata:rows});
  });
});

router.post('/updateUser/:id',function (req,res) {
  var name = req.body.name;
  var city = req.body.city;
  var email = req.body.email;
  var prof = req.body.prof

  var updateId = req.params.id;
  connection.query("UPDATE users SET name=?,city=?,email=?,prof=? WHERE id=?",[name,city,email,prof,updateId],function (err,respond) {
    if(err) throw err;
    res.redirect('../../')
  });

});

module.exports = router;
