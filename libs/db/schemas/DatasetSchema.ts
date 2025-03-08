import DataElement from "@/libs/db/schemas/DataElementSchema";  // Import DataElement model first
import { IDataSet } from "@/types/definations";
import mongoose, { Schema } from "mongoose";


const DataSetSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        dataElements: {
            type:[{type: mongoose.Schema.Types.ObjectId, ref: "DataElement"}],
            default: []
        },
        periodType: {type: mongoose.Schema.Types.ObjectId, ref: "PeriodType", required: true},
        orgUnits: {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: "OrgUnit"}],
            default: []
        }
    },
    { timestamps: true }
)

const DataSet = mongoose.models.DataSet || mongoose.model<IDataSet>("DataSet", DataSetSchema);

export default DataSet;