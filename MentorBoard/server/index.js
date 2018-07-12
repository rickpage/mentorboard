const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('./db/User');
const passport = require('./config/passport');
var session = require("express-session");



const messages = require('./db/messages');

const app = express();

app.use(session(
  { secret: "keyboard cat", 
  resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'yay'
  });
});

// app.post('/login', passport.authenticate("local"), (req, res) => {
//   console.log(req.user);
//   res.json(req.body);
//   // User.create(req.body)
//   // .then(function(dbUser) {
//   //   console.log(dbUser);
//   //   res.json(dbUser);
//   // })
//   // .catch(function(err) {
//   //   res.json(err);
//   // });
  
// })

app.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		console.log(req.user);
	}
)

app.post('/register', (req, res) => {
  User.create(req.body)
  .then(function(dbUser) {
    console.log(dbUser);
    res.json(dbUser);
  })
  .catch(function(err) {
    res.json(err);
  });
  
})

app.get('/messages', passport.authenticate("local"), (req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  });
});

app.post('/messages',passport.authenticate("local"), (req, res) => {
  console.log(req.body);
  messages.create(req.body).then((message) => {
    res.json(message);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});