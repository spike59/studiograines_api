const config = {
    account:{
        host: this.senderAccount.smtp.host,
        port: this.senderAccount.smtp.port,
        secure: this.senderAccount.smtp.secure,
        auth: {
          user: this.senderAccount.user,
          pass: this.senderAccount.pass,
        }
    }

  };
  
  module.exports = config;