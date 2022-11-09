const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  //   res.setHeader('set-cookie', '[setCookieFromServer=711]');
  console.log(req);
  res.sendFile(`${__dirname}/index.html`);
});

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running from port ${PORT}`);
});
