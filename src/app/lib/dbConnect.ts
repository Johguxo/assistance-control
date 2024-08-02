import { MongoClient } from 'mongodb';
import mongoose from "mongoose";
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;
console.log("Conecting to DB: ", uri)
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

const clientService = (): Promise<MongoClient> => {
    if (clientPromise) {
        console.log("reuse session")
        return clientPromise;
    }

    client = new MongoClient(uri, {
        minPoolSize: 3,
        maxPoolSize: 10
    });
    clientPromise = client.connect();
    return clientPromise;
};

export default clientService;

