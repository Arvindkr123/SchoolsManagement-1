import mongoose from "mongoose";

const numberOfYearsSchema = new mongoose.Schema(
  {
    numberOfYears: {
      type: Number,
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

const NumberOfYearsModel = mongoose.model("NumberOfYears", numberOfYearsSchema);

export default NumberOfYearsModel;
