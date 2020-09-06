const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer")
const {MONGOURI} = require('./keys')
const eventModel = require('./model/event.js');
const mentorModel = require('./model/mentor.js');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected DATABASE")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'seCReT',
  cookie: { maxAge: 3600000 },
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use('/mentor', require('./routes/mentor.js'));


app.get('/events', async (req, res) => {
  const event = await eventModel.find({});

  try {
    res.render('events',{event:event});
  } catch (err) {
    res.status(500).send(err);
  }
});



app.get('/mentors', async (req, res) => {
  const mentor = await mentorModel.find({});

  try {
    res.render('mentors',{mentor:mentor});
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/home', (req, res) => {
  res.status(200);
  res.render("home");
});

app.get('*', (req, res) => {
  res.status(404);
  res.redirect("/home");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
