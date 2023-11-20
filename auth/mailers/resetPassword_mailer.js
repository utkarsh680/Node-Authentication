const nodemailer = require("../config/nodemailer");

//this is another way of exporting method
exports.resetPasswordMail = async(email, subject, text, token) => {
  console.log("inside resetPassword mailer");

  try{
    await nodemailer.transporter.sendMail(
      {
        from: "singrishu680@gmail.com",
        to: email,
        subject: subject,
        text,
      }, (err, info) => {
          if(err){
              console.log('error in sending  mail' , err);
              return;
          }
          console.log("message sent", info);
          return;
      }
    );

  }catch(err){
    console.log(err);
  }

  
};

