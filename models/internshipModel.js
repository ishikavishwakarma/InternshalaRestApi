const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    employe:{  type:mongoose.Schema.Types.ObjectId,
      ref:"employe"},
    students:[{  type:mongoose.Schema.Types.ObjectId,
      ref:"student"}],
    profile: {
      type: String,
    },
    title: {
      type: String,
    },
    skill: {
      type: String,
    },
    organizationName:{
      type: String,
    },
    internshipType: {
      type: String,
      enum: ["In office", "Work from home"],
    },
    opening: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
      },
    },
    amount: Number,
    perks:String,
    assessments:String,
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;
