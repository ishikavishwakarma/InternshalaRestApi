const express  =  require("express");
const router  =  express.Router();
const employeController  =  require("../controllers/employeController");
const { isAuthenticated }  =  require("../middlewares/auth");

router.get("/",employeController.homepage)
                                                                                                                                                     
// POST /current
router.post("/current",isAuthenticated, employeController.currentEmploye)
                                                                                                                                                     
//POST  /student/signup
router.post("/signup", employeController.employeSignup)

//POST  /employe/signin
router.post("/signin", employeController.employeSignin)

//POST  /employe/signout
router.get("/signout",isAuthenticated, employeController.employeSignout)

//POST  /employe/sendmail
router.post("/sendmail", employeController.employeSendmail)

//get /employe/sendmail
router.get("/forget-link/:id", employeController.employeForgetlink)

//POST  /employe/sendmail
router.post("/reset-password/:id",isAuthenticated, employeController.employeResetPassword)

//POST  /employe/update/:id
router.post("/update/:id",isAuthenticated, employeController.employeUpdate)

//POST  /employe/avatar/:id
router.post("/avatar/:id",isAuthenticated, employeController.employeAvatar)

// -------------------------------------internship----------------------------

// post /internship/create
router.post("/internship/create",isAuthenticated, employeController.createInternship)

// post /internship/read
router.post("/internship/read",isAuthenticated, employeController.readInternship)

// post /internship/read/:id
router.post("/internship/read/:id",isAuthenticated, employeController.readsingleInternship)

// ----------------------------------------job-----------------------------------

// post /internship/create
router.post("/job/create",isAuthenticated, employeController.createJob)

// post /job/read
router.post("/job/read",isAuthenticated, employeController.readJob)

// post /job/read/:id
router.post("/job/read/:id",isAuthenticated, employeController.readsingleJob)


module.exports= router