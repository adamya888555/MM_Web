import mongoose from 'mongoose';

// Defer env resolution to avoid top-level throws during Next.js static analysis
const getMongoURI = () => process.env.MONGODB_URI || process.env.MONGO_URL;

interface MongooseConn {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

// Global scope to preserve connection across hot reloads in development
let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Mongoose> {
    const uri = getMongoURI();
    if (!uri) {
        throw new Error('Please define MONGODB_URI or MONGO_URL in your .env file');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;