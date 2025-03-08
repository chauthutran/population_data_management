import PeriodType from '@/libs/db/schemas/PeriodTypeShema';
import OrgUnit from '@/libs/db/schemas/OrgUnitSchema';
import DataSet from '@/libs/db/schemas/DatasetSchema';
import DataElement from '@/libs/db/schemas/DataElementSchema';
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .evn.local");
}

class Mongodb {
    
    private static instance: Mongodb;
    private connection: typeof mongoose | null = null;
    
    private constructor() {}
    
    public static getInstance(): Mongodb {
        if(!Mongodb.instance) {
            Mongodb.instance = new Mongodb();
        }
        
        return Mongodb.instance;
    }
    
    public async connect() {
        if(this.connection) {
            console.log("Using existing MongoDB connection");
            this.connection;
        }
        
        await this.establishConnection();
        
        // Ensure all schemas are loaded once
        this.loadModels();
    }
    
    public getConnection()  {
        return this.connection;
    }
    
    public async disconnect() {
        if(!this.connection) {
            console.log("No active MongoDB connection to close");
            return;
        }
        
        try {
            await mongoose.disconnect();
            this.connection = null;
            console.log("MongoSB connection closed");
        }
        catch(error) {
            console.log("Error closing MongoDB connection: ", error);
        }
    }
    
    // ================================================================================================
    // Supportive methods
    
    private async establishConnection() {
        try {
            const opts = {
                bufferCommands: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };

            this.connection = await mongoose.connect(MONGODB_URI!, opts);
            console.log("New MongoSB connection established");
            
            return this.connection;
        }
        catch(error: unknown) {
            if( error instanceof Error) {
                console.error("MongoDB connection error: ", error);
                throw new Error("MongoDB connection failed. Details: " + error.message);
            }
            else {
                console.error("Unexpected MongoDB connection error:", error);
                throw new Error("MongoDB connection failed due to an unknown error");
            }
        }
    }
    
    private async loadModels() {
        if (!mongoose.models.OrgUnit) OrgUnit.findOne().select("_id"); // use ".select("_id")", just for performance
        if (!mongoose.models.DataElement) DataElement.findOne().select("_id");
        if (!mongoose.models.PeriodType) PeriodType.findOne().select("_id");
        if (!mongoose.models.DataSet) DataSet.findOne().select("_id");
    }
}

export default Mongodb;