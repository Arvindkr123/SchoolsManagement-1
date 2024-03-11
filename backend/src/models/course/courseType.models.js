import mongoose from "mongoose";

const courseTypeSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CourseTypeModel = mongoose.model("CourseType", courseTypeSchema);

export default CourseTypeModel;
