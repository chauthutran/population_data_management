import { IApprovalData } from "@/types/definations";
import mongoose, { Schema } from "mongoose";

const ApprovalDataSchema = new Schema({
        dataSet: {type: mongoose.Schema.ObjectId, ref: "DataSet", required: true},
        period: {type: mongoose.Schema.Types.ObjectId, ref: "Period", required: true},
        approvedBy: {type: mongoose.Schema.ObjectId, ref: "User", required: true},
        approvedDate: {type: Date, required: true},
        acceptedBy: {type: mongoose.Schema.ObjectId, ref: "User", required: false},
        acceptedDate: {type: Date, required: true},
    }, {
        timestamps: true
    }
);

const ApprovalData = mongoose.models.ApprovalData || mongoose.model<IApprovalData>("ApprovalData", ApprovalDataSchema);
export default ApprovalData;