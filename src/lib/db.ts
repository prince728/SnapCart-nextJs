import { error } from "console";
import mongoose from "mongoose";

const mongooseURI: string = process.env.MONGODB_URI!;

if (!mongooseURI) {
    throw new Error("db secret key is missing");
}

const cache = global.mongoose

if (!cache) {
    cache: global.mongoose = { connection: null, promise: null }
}

export async function connectDB() {
    if (cache.connection) {
        return cache.connection
    }
    if (!cache.promise) {
        cache.promise = mongoose
            .connect(mongooseURI!)
            .then((conn) => conn.connection);
    }
    try {
        const connection = await cache.promise;
        return connection

    } catch (error) {
        cache.promise = null;
        console.error("DB connection error:", error);
        throw error;
    }
}