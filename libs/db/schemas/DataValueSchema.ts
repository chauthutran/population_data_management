import { IDataValue } from "@/types/definations";
import mongoose, { Schema } from "mongoose";

const DataValueSchema = new Schema(
    {
        dataElement: {type: mongoose.Schema.Types.ObjectId, ref: "DataElement", required: true},
        period: {type: mongoose.Schema.Types.ObjectId, ref: "Period", required: true},
        orgUnit: {type: mongoose.Schema.Types.ObjectId, ref: "OrgUnit", required: true},
        value: {type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const DataValue = mongoose.models.DataValue || mongoose.model<IDataValue>("DataValue", DataValueSchema);

export default DataValue;