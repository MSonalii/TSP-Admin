var express = require('express');
var firebase = require('firebase');
var admin = require('firebase-admin');

const controller = {};

controller.login = function(req, res){
	console.log('in user controller login');
  console.log(req.body.email);
  console.log(req.body.password);

  	const promise = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
    promise.then(function(success){
        console.log('in success');
        //console.log(success);
        res.render('addCompany');
    });
    promise.catch(function(error) {
    	console.log('in error');
	});
}

module.exports = controller;