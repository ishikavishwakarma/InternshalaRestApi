const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/",indexController.homepage)

//POST /student
router.post("/student",isAuthenticated, indexController.currentStudent)

//POST  /student/signup
router.post("/student/signup", indexController.studentSignup)

//POST  /student/signin
router.post("/student/signin", indexController.studentSignin)

//POST  /student/signout
router.get("/student/signout",isAuthenticated, indexController.studentSignout)

//POST  /student/sendmail
router.post("/student/sendmail", indexController.studentSendmail)

//get /student/sendmail
router.get("/student/forget-link/:id", indexController.studentForgetlink)

//POST  /student/sendmail
router.post("/student/reset-password/:id",isAuthenticated, indexController.studentResetPassword)

//POST  /student/update/:id
router.post("/student/update/:id",isAuthenticated, indexController.studentUpdate)

//POST  /student/avatar/:id
router.post("/student/avatar/:id",isAuthenticated, indexController.studentAvatar)

// ----------------------apply internship----------
router.post("/student/internship/read",indexController.readAllinternship)
router.post("/student/internship/read/:id",isAuthenticated,indexController.readSingleinternship)
//POST /student/apply/:internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated, indexController.applyinternship)

// ----------------------apply job----------
                                                                                                                                
//POST /student/apply/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated, indexController.applyjob)
router.post("/student/job/read",indexController.readAllJob)
router.post("/student/job/read/:id",isAuthenticated,indexController.readSingleJob)


module.exports= router