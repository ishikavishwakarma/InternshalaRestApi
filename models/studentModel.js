const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentModel = new mongoose.Schema(
{
firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [4, " first name should have atleast 4character "],
},
lastName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [4, " last name should have atleast 4character "],
},
avatar: {
type: Object,
default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1704194760975-6b80271ebf98?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
},
contact: {
      type: String,
      required: [true, "Contact is required"],
      minLength: [10, " Contact should have atleast 10 character "],
      maxLength: [10, "Contact should be exceed 10 character"],
},
gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
city: {
      type: String,
      required: [true, "City name is required"],
      minLength: [3, " city name should have atleast 3 character "],
},
email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
password: {
      type: String,
      select: false,
      maxLength: [15, "password should not be exceed more than 15 character "],
      minLength: [6, "password should have atleast 6 character "],
      // match
},
resume: {
      education: [],
      jobs: [],
      internships: [],
      responsibilities: [],
      courses: [],
      skills: [],
      projects: [],
      accomplishment: [],
},
internships:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"internship"
      }
],
jobs:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"job"
      }
],
resetPassword: {
      type: String,
      default: "0",
},
    key: String,
  },
  {
    timestamps: true,
  }
);
studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
studentModel.methods.camparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const Student = mongoose.model("student", studentModel);
module.exports = Student;
