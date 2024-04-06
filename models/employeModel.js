const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeModel = new mongoose.Schema(
  {
firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [4, " first name should have atleast 4 character "],
},
lastName: {
      type: String,
      required: [true, " First name is required "],
      minLength: [4, " last name should have atleast 4 character "],
},
organizationName: {
        type: String,
        required: [true, "organization name is required"],
        minLength: [4, " organization name should have atleast 4 character "],
},
organizationLogo: {
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
Email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
},
Password: {
      type: String,
      select: false,
      maxLength: [15, "password should not be exceed more than 15 character "],
      minLength: [6, "password should have atleast 6 character "],
      // match
},
resetPassword: {
      type: String,
      default: "0",
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
key: String,
  },
  {
    timestamps: true,
  }
);

employeModel.pre("save", function () {
  if (!this.isModified("Password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.Password = bcrypt.hashSync(this.Password, salt);
});
employeModel.methods.camparePassword = function (Password) {
  return bcrypt.compareSync(Password, this.Password);
};

employeModel.methods.getJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const Employe = mongoose.model("employe", employeModel);
module.exports = Employe;
