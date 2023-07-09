import mongoose from 'mongoose';
import {ApiError} from "src/lib/errors/ApiError";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

async function dbConnect() {
  if (!MONGO_URI) {
    throw new ApiError({
      code: 508,
      message: 'Database not properly configured'
    })
  }
  
  if (cached.conn) {
    return cached.conn
  }
  
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
  
  return cached.conn;
}

export default dbConnect;