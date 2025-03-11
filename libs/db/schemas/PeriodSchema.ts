import { IPeriod } from "@/types/definations";
import mongoose, { Schema } from "mongoose";

const PeriodSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        code: {type: String, required: true, unique: true},
        periodType: {type: mongoose.Schema.Types.ObjectId, ref: "PeriodType"},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true}
    },
    {
        timestamps: true //Automatically adds createdAt and updatedAt fields to each document.
    }
);

const Period = mongoose.models.Period || mongoose.model<IPeriod>("Period", PeriodSchema);

export default Period;