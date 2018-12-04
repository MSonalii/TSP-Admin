var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var exphbs = require('express-handlebars');
var firebase = require('firebase');
var admin = require('firebase-admin');

var index = require('./routes/index');
var company = require('./routes/company');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret : 'secret',
	saveUninitialized: true,
	resave : true
}));

app.use(flash());

app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', company);
app.use('/company', company);

var serviceAccount = require(path.join(__dirname, 'tsp-admin-f3900-firebase-adminsdk-etsna-f205b5d2a2.json'));
console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

var config = {
  apiKey: "AIzaSyBmp8xKtRpf0_xvDvsa6CIQuKv0Z_AiU_8",
  authDomain: "tsp-admin-f3900.firebaseapp.com",
  databaseURL: "https://tsp-admin-f3900.firebaseio.com",
  projectId: "tsp-admin-f3900",
  storageBucket: "",
  messagingSenderId: "973870726711"
};
firebase.initializeApp(config);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('server started on port'+app.get('port'));
});