require('dotenv').config()
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");//SENDGRID
const path = require("path");
const mime = require("mime");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//SENDGRID HERE I ENTER MY SENDGRID USER NAME AND PASSWORD
var options = {
    auth: {
      api_user: 'pepper$18',//MUST CREAT .ENV AND .GITIGNORE SO FILE IS NOT UPLOADED THIS HIDES CREDENTIALS
      api_key:  'sendgrid$18'
    }
  }

  //const sendgrid = sgTransport(options);
  //const client = nodemailer.createTransport(sendgrid); //INTEGRATIONS BETWEEN NODEMAILER AND SENDGRID

  const sendgrid = sgTransport(options);
  const client = nodemailer.createTransport(sendgrid);

  

//TROUBLE SHOOTING LOGO RENDERING
  //app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.static('public'));



//WHEN USER ENTERS NAME AND EMAIL AND CLICKS ON JOIN
  app.get("/home", (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));

  });

  

  //DEFINED IN .ENV
  console.log(process.env.SENDGRID_PASSWORD);
  process.env.SENDGRID_USERNAME
  process.env.SENDGRID_PASSWORD

//TO SEND EMAIL 
    app.get("/", (req, res) =>{
        res.redirect('/home');
        
    });
    app.post("/sendMail", (req, res) => {
        //TODO
        //SEND EMAIL WITH NODEMAILER
        console.log(req.body);
        var emailusr = req.body.email;
        var name = req.body.name; 

        
        
        const email = {
            from: 'pawsibility.com',
            to: `${emailusr}`,
            subject: `Welcome to Pawsibility ${name}`,
            text: `Hello ${name} ` ,
            html: `<b>Thanks for joining!!! ${emailusr}</b>`
          };

        client.sendMail(email, (err, info) => {
            if(err){
                console.log("Error: ", err);
            } else {
                console.log("Email has been sent!", info);
            }
        })//SEND EMAIL
        
        //DUMMY EXAMPLE TO SEE IF SERVER IS LISTENING
        res.json({msg: "OK"});
    });

    app.listen(port, () => {
        console.log("Server is LIVE at ", port);
    });
