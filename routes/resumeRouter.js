const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.get("/", isAuthenticated, resumeController.homepage);

// POST
router.post("/add-edu", isAuthenticated, resumeController.addEducation);

//POST
router.post(
  "/edit-edu/:eduid",
  isAuthenticated,
  resumeController.editEducation
);

//POST
router.post("/del-edu/:eduid", isAuthenticated, resumeController.deleteEducation);

//POST
router.post("/add-job", isAuthenticated, resumeController.addJob);

//POST
router.post(
  "/edit-job/:jobid",
  isAuthenticated,
  resumeController.editJob
);

// //POST
router.post("/del-job/:jobid", isAuthenticated, resumeController.deleteJob);

//POST
router.post("/add-internship", isAuthenticated, resumeController.addInternship);

//POST
router.post(
  "/edit-internship/:internshipid",
  isAuthenticated,
  resumeController.editInternship
);

// //POST
router.post("/del-internship/:internshipid", isAuthenticated, resumeController.deleteInternship);
//POST
router.post("/add-responsibilities", isAuthenticated, resumeController.addresponsibilities);

//POST
router.post(
  "/edit-responsibilities/:responsibilitiesid",
  isAuthenticated,
  resumeController.editresponsibilities
);

// //POST
router.post("/del-responsibilities/:responsibilitiesid", isAuthenticated, resumeController.deleteresponsibilities);
//POST
router.post("/add-skills", isAuthenticated, resumeController.addskills);

//POST
router.post(
  "/edit-skills/:skillsid",
  isAuthenticated,
  resumeController.editskills
);

// //POST
router.post("/del-skills/:skillsid", isAuthenticated, resumeController.deleteskills);

router.post("/add-courses", isAuthenticated, resumeController.addcourses);

//POST
router.post(
  "/edit-courses/:coursesid",
  isAuthenticated,
  resumeController.editcourses
);

// //POST
router.post("/del-courses/:coursesid", isAuthenticated, resumeController.deletecourses);

router.post("/add-projects", isAuthenticated, resumeController.addprojects);

//POST
router.post(
  "/edit-projects/:projectsid",
  isAuthenticated,
  resumeController.editprojects
);

// //POST
router.post("/del-projects/:projectsid", isAuthenticated, resumeController.deleteprojects);

module.exports = router;
