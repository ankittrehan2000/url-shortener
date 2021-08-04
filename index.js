const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const ejs = require('ejs');
const multer = require('multer');
upload = multer();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 

//checks for views folder
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('public/index');
});

//******ideally for a larger project this data would be stored in a database and the domain name would be a small one
SHORTENED_SLUGS = {}

app.get('/:id', (req, res) => {
  const id = req.params.id;
  if (id in SHORTENED_SLUGS){
    //redirect to the original url given to us
    res.redirect(307, SHORTENED_SLUGS[id]);
  } else {
    res.render('public/index');
  }
})

app.post('/generate', (req, res) => {
  const body = req.body;
  if (body.slug in SHORTENED_SLUGS) res.render('public/error', {slug: body.slug});
  else {
    SHORTENED_SLUGS[body.slug] = body.urlField;
    res.render('public/confirmed', {slug: body.slug});
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})