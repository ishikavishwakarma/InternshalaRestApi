const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorHandler");

exports.sendmail = (req,res, next,url) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    post:465,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailoptions = {
    from: "ishika here from",
    to: req.body.email,
    subject: "password resent link",
    text: "do not share this link to anyone",
    html: `<h1>click link below to reset password </h1><a href="${url}">Password reset link </a>`,
  };

  transport.sendMail(mailoptions, (err, info) => {
    if (err) return next( new ErrorHandler(err, 500) );
        console.log(info);
        return res.status(200).json({
            message:"mail sent",
            url,
        })
  });
};
