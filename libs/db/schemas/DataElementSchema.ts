import { IDataElement } from "@/types/definations";
import mongoose, { Schema } from "mongoose";

const DataElementSchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
        shortName: { type: String, required: true, unique: true}
    },
    {
        timestamps: true //Automatically adds createdAt and updatedAt fields to each document.
    }
)

const DataElement = mongoose.models.DataElement || mongoose.model<IDataElement>("DataElement", DataElementSchema);

export default DataElement;