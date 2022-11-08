const express = require('express');
const app = express();
// const path = require('path');
//lets create a demo stuff

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());

function generateRandomNum() {
  return Math.random() * (2000000 - 1000000) + 1000000;
}
app.get('/', (req, res) => {
  res.setHeader('set-cookie', '[setCookieFromServer=711]');
  res.sendFile(`${__dirname}/index.html`);
  // console.log(`${__dirname}/index.html`);
  //   res.send('index.html');
});

//lets create a demo stuff
let session = {};
app.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/login.html`);
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const userPassword = req.body.password;

  //query db using req.body.username to find password
  let passwordFromDB = 'nice';

  //after having both passwords compare them
  let passwordMatch =
    userPassword.toLowerCase() === passwordFromDB.toLowerCase(); //assign session

  if (passwordMatch) {
    //credentials match
    session.id = generateRandomNum();
    res.cookie('sessionId', session.id);
    res.send('your are logged in.');
  } else {
    res.send('password doesnt match');
  }
});

app.get('/user', (req, res) => {
  if (req.headers.cookie.includes('sessionId')) {
    // res.send('welcome you are authorized');
    res.sendFile(`${__dirname}/hello.html`);
    console.log(req.headers);
    console.log(req.cookies);
    console.log(req.headers.cookie);

    console.log(req.session);
  }
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running from port ${PORT}`);
});
