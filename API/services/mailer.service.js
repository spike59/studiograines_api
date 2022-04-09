const nodemailer = require("nodemailer");
//TODO a configurer
//const mailConfig = require('../../config')('mail');
class MailerService {

  // constructor() {
  //   try {
  //     //this.senderAccount = require("../config/mailer.config");
  //     this.senderAccount = require('../../config')('mail');
  //   } catch {
  //     e => {
  //       console.log("error", e);
  //     }
  //   }
  // }

  static sendMail = async (params) => {
    console.log("SENDING MAIL");
    const mailParams = {
      subject: "email test",
      html: "<b>message de test</b>",
    };
    if (!params || !params.to) {
      const receiverAccount = await nodemailer.createTestAccount();
      mailParams.to = receiverAccount.user;
    }
    Object.assign(mailParams, params);

    if (!this.senderAccount) {
      this.senderAccount = await nodemailer.createTestAccount();
    }
    mailParams.from = this.senderAccount.user;

    const transporter = nodemailer.createTransport({
      host: this.senderAccount.smtp.host,
      port: this.senderAccount.smtp.port,
      secure: this.senderAccount.smtp.secure,
      auth: {
        user: this.senderAccount.user,
        pass: this.senderAccount.pass,
      },
    });

    let final = await MailerService.wrapedSendMail(transporter,mailParams);
    console.log("final",final);
    return final
    // await transporter.sendMail(mailParams, (err, info) => {
    //   if (err) {
    //     console.log('Error occurred. ' + err.message);
    //     return false;
    //     //resolve(false);
    //   }
    //   console.log("Email sent : ", info, "\nView sent mail at : ", nodemailer.getTestMessageUrl(info));
    //   return true;
    //   //resolve(true);
    // });
    // console.log("final",final);
    // return final
  };
  static wrapedSendMail = async (transporter,mailOptions) => {
    return new Promise((resolve, reject) => {
      //let transporter = nodemailer.createTransport({mailOptions});
      //let transporter =trans;
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error is " + error);
            resolve(false); // or use rejcet(false) but then you will have to handle errors
          }
          else {
            console.log('Email sent: ' + info.response);
            console.log("\nView sent mail at : ", nodemailer.getTestMessageUrl(info));
            resolve(true);
          }
        });
    })
  }
  sendMail = async (params) => {
    let rr = await MailerService.sendMail(params);
    console.log("rr", rr);
    return rr;
  }

}

module.exports = MailerService;