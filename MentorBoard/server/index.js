const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('./db/User')

const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'messageboard'
  });
});
app.get('/login', (req, res) => {
  res.json();
});
app.get('/messages', (req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  });
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.create(req.body).then((message) => {
    res.json(message);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});

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

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});