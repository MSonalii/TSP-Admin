var express = require('express');
var userController = require('../controller/user.controller');
var router = express.Router();

// Get Homepage

router.get('/', function(req, res){
	res.render('addCompany');
});

router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(req, res){
	console.log('in login post');
	//console.log(req);
	userController.login(req,res)
});

router.get('/logout', function(req, res){
	res.render('login');
});
module.exports = router;