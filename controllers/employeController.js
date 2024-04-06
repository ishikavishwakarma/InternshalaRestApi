const path = require("path");
const { catchAsync } = require("../middlewares/catchAsync");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendTokenEmploye } = require("../utils/sendTokens");
const crypto = require("crypto");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const imagekit = require("../utils/imagekit").initImagekit();

const homepage = catchAsync(async (req, res, next) => {
  res.json({ message: "secure employe homepage" });
});
const currentEmploye = catchAsync(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  res.json({ employe });
});

const employeSignup = catchAsync(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendTokenEmploye(employe, 201, res);
});

const employeSignin = catchAsync(async (req, res, next) => {
  const employe = await Employe.findOne({ Email: req.body.Email })
   .select("+Password")
  .exec();
  if (!employe)
    return next(
      new ErrorHandler("user not found with this email address", 404)
);
const isMatch = employe.camparePassword(req.body.Password);
  if (!isMatch) return next(new ErrorHandler("wrong credentials ", 500));
  sendTokenEmploye(employe, 200, res);
});

const employeSignout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout!" });
});

const employeSendmail = catchAsync(async (req, res, next) => {
const employe = await Employe.findOne({ email: req.body.email }).exec();
if (!employe) {
   return next(
      new ErrorHandler("user not found with this email address", 404)
 );
}
crypto.randomBytes(80, async function (err, buff) {
    var key = buff.toString("hex");
    employe.key = key;
});
await employe.save();
const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employe.key
  }/${employe._id}`;
  sendmail(req, res, next, url);
  employe.resetPassword = "1";
  await employe.save();
  res.json({ employe, url });
});

const employeForgetlink = catchAsync(async (req, res, next) => {
const employe = await Employe.findById(req.params.id).exec();
if(!employe) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
);
}    
if (employe.resetPassword == "1") {
    employe.password = req.body.password;
    employe.resetPassword = "0";
    employe.key = "";
    await employe.save();
} else {
    return next(
      new ErrorHandler("invalid reset password link please try again", 500)
    );
  }
  res.status(200).json({ message: "password successfully changed" });
});

const employeResetPassword = catchAsync(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  employe.password = req.body.password;
  await employe.save();
  sendTokenEmploye(employe, 201, res);
  // res.status(200).json({ message: "password successfully reset" });
});

const employeUpdate = catchAsync(async (req, res, next) => {
  const employe = await Employe.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();         
  res
    .status(200)
    .json({ success: true, message: "successfully updated", employe });
});

const employeAvatar = catchAsync(async (req, res, next) => {
  const employe = await employe.findById(req.params.id).exec();
  const file = req.files.organizationLogo;
  const modifiedName = ` resumebuilder-${Date.now()}${path.extname(file.name)}`;
  if (employe.organizationLogo.fileId !== "") {
    await imagekit.deleteFile(employe.organizationLogo.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedName,
  });

  employe.organizationLogo = { fileId, url };
  await employe.save();
  res.status(200).json({ success: true, message: "successfully uploaded" });
});

//---------------------------------internships-------------------------------

const createInternship = catchAsync(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await new Internship(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  res.status(200).json({ success: true, internship });
});
const readInternship = catchAsync(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ success: true, internships });
});
const readsingleInternship = catchAsync(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});
//---------------------------jobs-----------------------
const createJob = catchAsync(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await new Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();
  res.status(200).json({ success: true, job });
});

const readJob = catchAsync(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
  res.status(200).json({ success: true, jobs });
});

const readsingleJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});

module.exports = {
  homepage,
  employeSignup,
  employeSignin,
  employeSignout,
  currentEmploye,
  employeSendmail,
  employeUpdate,
  employeForgetlink,
  employeResetPassword,
  employeAvatar,
  createInternship,
  readInternship,
  readsingleInternship,
  createJob,
  readJob,
  readsingleJob,
};
// -------------------------------------internship-----------
