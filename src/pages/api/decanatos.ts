import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";


if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        const client = new MongoClient(uri);

        try {
            await client.connect();


            // DB
            const database = client.db("database-jaj");

            // COLECCION
            const collection = database.collection("decanates");
            const allData = await collection.find({}).toArray();
            
            res.status(200).json(allData);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }


}