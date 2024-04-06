const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
    employe:{  type:mongoose.Schema.Types.ObjectId,
      ref:"employe"},
      students:[{  type:mongoose.Schema.Types.ObjectId,
        ref:"student"}],
    title: {
      type: String,
    },
    
organizationName: {
      type: String,
    },

    skill: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ["In office", "Work from home"],
    },
    opening: Number,
    description:String,
    experience:String,
    preferences:String,
    salary:Number,
    perks:String,
    assessments:String,
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobModel);
module.exports = Job;
