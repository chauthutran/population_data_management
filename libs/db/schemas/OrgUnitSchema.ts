import { IOrgUnit } from '@/types/definations';
import mongoose, { Schema } from 'mongoose';

const OrgUnitSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrgUnit',
            default: null,
        },
        level: { type: Number, required: true },
    },
    {
        timestamps: true, //Automatically adds createdAt and updatedAt fields to each document.
    },
);

const OrgUnit =
    mongoose.models.OrgUnit ||
    mongoose.model<IOrgUnit>('OrgUnit', OrgUnitSchema);

export default OrgUnit;
