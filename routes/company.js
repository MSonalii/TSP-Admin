var express = require('express');
var companyController = require('../controller/company.controller');
var router = express.Router();

// Get Homepage

router.get('/', function(req, res){
	res.render('addCompany');
});

router.get('/listCompany', function(req, res){
	res.render('listCompany');
});


router.post('/addCompany', function(req, res){
	companyController.addCompany(req,res);
});

module.exports = router;