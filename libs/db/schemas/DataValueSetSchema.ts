import mongoose, { Schema } from "mongoose";

const DataValueSetSchema = new Schema(
    {
        dataElement: {type: mongoose.Schema.Types.ObjectId, ref: "DataElement", required: true},
        period: {type: mongoose.Schema.Types.ObjectId, ref: "Period", required: true},
        value: {type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const DataValueSet = mongoose.models.DataValueSet || mongoose.model("DataValueSet", DataValueSetSchema);

export default DataValueSet;