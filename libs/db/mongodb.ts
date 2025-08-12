import mongoose from 'mongoose';
import OrgUnit from './schemas/OrgUnitSchema';
import DataElement from './schemas/DataElementSchema';
import PeriodType from './schemas/PeriodTypeShema';
import Period from './schemas/PeriodSchema';
import DataSet from './schemas/DatasetSchema';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    );
}

// Explicitly type the global.mongoose usage
interface MongooseCache {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
    mongoose: MongooseCache;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('MongoDb connecting ... ');

        const opts = {
            // Mongoose buffers commands—that is, it queues database operations (like find, create, etc.)
            // if a connection to MongoDB hasn't been established yet. Once the connection is made,
            // Mongoose executes those queued commands.
            bufferCommands: true,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('New MongoBB connection established.');
                // Ensure all schemas are loaded once
                loadModels();

                return mongoose;
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.error('MongoDB connection error: ', error);
                    throw new Error(
                        'MongoDB connection failed. Details: ' + error.message,
                    );
                } else {
                    console.error(
                        'Unexpected MongoDB connection error:',
                        error,
                    );
                    throw new Error(
                        'MongoDB connection failed due to an unknown error',
                    );
                }
            });
    }

    cached.conn = await cached.promise;
    console.log('Using existing MongoDB connection');
    return cached.conn;
}

function loadModels() {
    if (!mongoose.models.OrgUnit) OrgUnit.findOne().select('_id'); // use ".select("_id")", just for performance
    if (!mongoose.models.DataElement) DataElement.findOne().select('_id');
    if (!mongoose.models.PeriodType) PeriodType.findOne().select('_id');
    if (!mongoose.models.Period) Period.findOne().select('_id');
    if (!mongoose.models.DataSet) DataSet.findOne().select('_id');
}

export default connectToDatabase;
