const path = require("path");
const { catchAsync } = require("../middlewares/catchAsync");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

const homepage = catchAsync(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  if (!resume) {
    return next(new ErrorHandler("resume not found", 404));
  }
  res.json({ message: "secure resumepage", resume });
});

//      education
const addEducation = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "educationn add" });
});
const editEducation = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "educationn edited" });
});

const deleteEducation = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education = filterIndex;
  await student.save();
  res.json({ message: "educationn deleted" });
});

//      jobs
const addJob= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "jobsn edit" });
});
const editJob= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "jobs edited" });
});
const deleteJob= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  student.resume.jobs = filterIndex;
  await student.save();
  res.json({ message: "jobs deleted" });
});
//      internship
const addInternship= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internship add" });
});
const editInternship= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const InternshipIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internshipid
  );
  student.resume.internships[InternshipIndex] = {
    ...student.resume.internships[InternshipIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "internships edited" });
});

const deleteInternship= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.internships.filter(
    (i) => i.id !== req.params.internshipid
  );
  student.resume.internships = filterIndex;
  await student.save();
  res.json({ message: "internships deleted" });
});
//      internship
const addresponsibilities= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internship add" });
});
const editresponsibilities= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilityIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.responsibilitiesid
  );
  student.resume.responsibilities[responsibilityIndex] = {
    ...student.resume.responsibilities[responsibilityIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "responsibilities edited" });
});

const deleteresponsibilities= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.responsibilitiesid
  );
  student.resume.responsibilities = filterIndex;
  await student.save();
  res.json({ message: "responsibilities deleted" });
});
//      internship
const addskills= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "skills add" });
});
const editskills= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillsIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillsid
  );
  student.resume.skills[skillsIndex] = {
    ...student.resume.skills[skillsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "skills edited" });
});

const deleteskills= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.skills.filter(
    (i) => i.id !== req.params.skillsid
  );
  student.resume.skills = filterIndex;
  await student.save();
  res.json({ message: "skills deleted" });
});
//      internship
const addcourses= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "courses add" });
});

const editcourses= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const coursesIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.skillsid
  );
  student.resume.courses[coursesIndex] = {
    ...student.resume.courses[coursesIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "courses edited" });
});

const deletecourses= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.courses.filter(
    (i) => i.id !== req.params.coursesid
  );
  student.resume.courses = filterIndex;
  await student.save();
  res.json({ message: "courses deleted" });
});
//      internship
const addprojects= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "projects add" });
});
const editprojects= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectsIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectsid
  );
  student.resume.projects[projectsIndex] = {
    ...student.resume.projects[projectsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "projects edited" });
});

const deleteprojects= catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterIndex = student.resume.projects.filter(
    (i) => i.id !== req.params.projectsid
  );
  student.resume.projects = filterIndex;
  await student.save();
  res.json({ message: "projects deleted" });
});

module.exports = {
  homepage,
  addJob,
  editJob,
  deleteJob,
  addEducation,
  editEducation,
  deleteEducation,
  addInternship,
  editInternship,
  deleteInternship,
  addresponsibilities,
  editresponsibilities,
  deleteresponsibilities,
  addskills,
  editskills,
  deleteskills,
  addcourses,
  editcourses,
  deletecourses,
  addprojects,
  editprojects,
  deleteprojects
};
