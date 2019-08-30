const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 require('./routes/snowload.route')(app);
 require('./routes/user.route')(app);

 app.get('/', (req, res) => {
  res.send('Welcome')
})


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://renato:goias123@cluster0-hh8nf.mongodb.net/test?retryWrites=true&w=majority';
// let dev_db_url = 'mongodb+srv://admin:test123@cluster0-deg6o.mongodb.net/test?retryWrites=true&w=majority';
//let dev_db_url =  'mongodb://localhost:27017/wivaa';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000);