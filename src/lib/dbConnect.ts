import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

const clientService = (): Promise<MongoClient> => {
    if (clientPromise) {
        return clientPromise;
    }

    client = new MongoClient(uri);
    clientPromise = client.connect();
    return clientPromise;
};

export default clientService;
