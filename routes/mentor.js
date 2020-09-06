const express = require('express');
const eventModel = require('../model/event.js');
const mentorModel = require('../model/mentor.js');
const nodemailer = require("nodemailer");
const {GMAIL_PASS} = require('../keys')
const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'shambhavishandilya01@gmail.com',
      pass: GMAIL_PASS
  },
      tls: {
          rejectUnauthorized: false
      }
});
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});


app.post("/mentor-code",(req,res) => {
	
		const mentor = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"expert": req.body.expert,
		"designation": req.body.designation
	}
	var email = req.body.email;
	const mailOptions = {
      from: 'shambhavishandilya01@gmail.com',
      to: req.body.email,
      subject: 'Welcome to Learn Together',
      text: 'Welcome to Learn Together. Your Code to Complete the Registration Process is - 123'+req.body.name+'*&%'
    };
    
    transporter.sendMail(mailOptions, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 
    
    res.status(200);
    res.render("mentor-register",{
        name : mentor.name,
        email: mentor.email,
        password: mentor.password,
        expert: mentor.expert,
        designation: mentor.designation
      });
    
})

app.post("/mentor-register",(req,res) => {
	const { name, code} = req.body;
	if(code == '123'+name+'*&%'){
			const doc = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"expert": req.body.expert,
		"designation": req.body.designation
	}
	
	const new_mentor = new mentorModel(doc);

  try {
    new_mentor.save();
const mentor = mentorModel.find({});

  try {
    res.status(200);
    res.redirect("home")
  } catch (err) {
    res.status(500).send(err);
  }
  } catch (err) {
    res.status(500).send(err);
  }
}
else
{
	res.status(500);
	res.redirect("/error");
}
	
})


app.get("/mentor-code",(req,res) => {
	res.render("mentor-code");
});

app.post("/mentor-login",(req,res) => {

mentorModel.findOne({'email':req.body.email},
  function(err,data)
  {
	  if(!err)
	  { 
	     if(data.password == req.body.password)
	     {
			 const mentor = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"expert": req.body.expert,
		"designation": req.body.designation
    };
			 res.status(200);
             res.render("mentor-dashboard",{mentor:data})
		 }
		 else
		 {
		  res.status(500);
	      res.redirect("/error");
		 }
	  }
	  else
	  {
		res.send(err);  
	  }});

	
}
)

app.post('/mentor/mentor-dashboard/add-event', async (req,res) => {

    const data2 = {
        "title": req.body.title,
        "content": req.body.content,
        "author": req.body.author,
        "link": req.body.link,
    };
  const new_event = new eventModel(data2);

  try {
     new_event.save();
const event =  eventModel.find({});

  try {
    res.status(200);
    res.render("add")
  } catch (err) {
    res.status(500).send(err);
  }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/logout",(req,res) => {
	res.redirect("/home");
});

module.exports = app;
