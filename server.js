require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");//SENDGRID


//SENDGRID HERE I ENTER MY SENDGRID USER NAME AND PASSWORD
var options = {
    auth: {
      api_user: 'pepper$18',//MUST CREAT .ENV AND .GITIGNORE SO FILE IS NOT UPLOADED THIS HIDES CREDENTIALS
      api_key: 'sendgrid$18'
    }
  }

  //const sendgrid = sgTransport(options);
  //const client = nodemailer.createTransport(sendgrid); //INTEGRATIONS BETWEEN NODEMAILER AND SENDGRID

  const client = nodemailer.createTransport(sgTransport(options));

  const email = {
    from: 'pawsibility.com',
    to: 'liribot18@gmail.com',
    subject: 'Welcome to Pawsibility',
    text: 'Hello ',
    html: '<b>Thanks for joining!!!</b>'
  };

  //DEFINED IN .ENV
  process.env.SENDGRID_USERNAME
  process.env.SENDGRID_PASSWORD

//TO SEND EMAIL  
    app.get("/", (req, res) => {
        //TODO
        //SEND EMAIL WITH NODEMAILER
        
        client.sendMail(email, (err, info) => {
            if(err){
                console.log("Error: ", err);
            } else {
                console.log("Email has been sent!", info);
            }
        })//SEND EMAIL
        
        //DUMMY EXAMPLE
        res.json({msg: "OK"});
    });

    app.listen(port, () => {
        console.log("Server is LIVE at ", port);
    });