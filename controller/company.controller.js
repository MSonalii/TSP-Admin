var express = require('express');
var firebase = require('firebase');
var admin = require('firebase-admin');
const controller = {};

controller.addCompany = function(req, res){
	console.log('in company controller add company');
  console.log(req.body);
  req.body.displayName = req.body.companyCode + '/' + req.body.displayName;
  console.log(req.body.displayName);
  var db = admin.firestore();

  var companyRef = db.collection(req.body.companyCode).doc("dummy");

  var userRef = companyRef.collection('users').doc();
  var deptRef = companyRef.collection('department').doc("sales");

  var setAlan = userRef.set({
    "superadmin":true,
    displayName:req.body.displayName
  });
  //display name not should be in table, it should be in user creation prop
  var dept = deptRef.set({
    "dummy":true,
  });

  var adminDb = db.collection('admin-db').doc(req.body.companyCode);

  var admin1 = adminDb.set({
    "users-count": req.body.noOfSubscription
  });

    admin.auth().createUser({
      email: req.body.userName,
      username: req.body.userName,
      emailVerified: false,
      password: req.body.password,
      disabled: false
    }).then(function(userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
    }).catch(function(error) {
      console.log("Error creating new user:", error);
    });

}

module.exports = controller;