import mongoose, { Schema } from "mongoose";

const PeriodTypeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true}
    },
    {
        timestamps: true //Automatically adds createdAt and updatedAt fields to each document.
    }
)

const PeriodType = mongoose.models.PeriodType || mongoose.model("PeriodType", PeriodTypeSchema);

export default PeriodType;