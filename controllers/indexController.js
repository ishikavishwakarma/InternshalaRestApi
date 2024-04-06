const path = require("path");
const { catchAsync } = require("../middlewares/catchAsync");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendTokens } = require("../utils/sendTokens");
const crypto = require("crypto");
const imagekit = require("../utils/imagekit").initImagekit();
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")

const homepage = catchAsync(async (req, res, next) => {
  res.json({ message: "secure homepage" });
});

const currentStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  res.json({ student });
});
const studentSignup = catchAsync(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendTokens(student, 201, res);
});

const studentSignin = catchAsync(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student)
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );

  const isMatch = student.camparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong credentials ", 500));

  sendTokens(student, 200, res);
});
const studentSignout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout!" });
});
const studentSendmail = catchAsync(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }
  crypto.randomBytes(80, async function (err, buff) {
    var key = buff.toString("hex");
    student.key = key;
  });
  await student.save();

  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    student.key
  }/${student._id}`;
  sendmail(req, res, next, url);
  student.resetPassword = "1";
  await student.save();
  res.json({ student, url });
});
const studentForgetlink = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  if (!student) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }
  if (student.resetPassword == "1") {
    student.password = req.body.password;
    student.resetPassword = "0";
    student.key = "";
    await student.save();
  } else {
    return next(
      new ErrorHandler("invalid reset password link please try again", 500)
    );
  }

  res.status(200).json({ message: "password successfully changed" });
});

const studentResetPassword = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password;

  await student.save();
  sendTokens(student, 201, res);
  // res.status(200).json({ message: "password successfully reset" });
});
const studentUpdate = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();

  res
    .status(200)
    .json({ success: true, message: "successfully updated", student });
});

const studentAvatar = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedName = ` resumebuilder-${Date.now()}${path.extname(file.name)}`;
  if(student.avatar.fileId   !==   ""){
    await imagekit.deleteFile(student.avatar.fileId)
  }
  const {fileId,url} = await imagekit.upload({
    file:file.data,
    fileName:modifiedName,
  });
  student.avatar = {fileId,url}
  await student.save();
  res
    .status(200)
    .json({ success: true, message: "successfully uploaded"});
});

// ----------apply internship-------

const readSingleinternship = catchAsync(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});
const applyinternship = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save()
  await internship.save()
  res.json({ student,internship });
});

const readAllinternship = catchAsync(async (req, res, next) => {

  const internship = await Internship.find().exec();
  
  res.json({internship });
});

// ----------apply job-------
const applyjob = catchAsync(async (req, res, next) => {
  const student = await Job.findById(req.params.jobid).exec();
  const job = await Job.findById(req.params.jobid).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save()
  await job.save()
  res.json({ student,job });
});
const readAllJob = catchAsync(async (req, res, next) => {

  const job = await Job.find().exec();
  
  res.json({job });
});
const readSingleJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});

module.exports = {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
  currentStudent,
  studentSendmail,
  studentUpdate,
  studentForgetlink,
  studentResetPassword,
  studentAvatar,
  applyjob,
  applyinternship,
  readSingleinternship,
  readAllinternship,
  readAllJob,
  readSingleJob
};
