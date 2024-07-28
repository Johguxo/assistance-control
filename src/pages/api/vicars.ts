import { NextApiRequest, NextApiResponse } from "next";
import clientService from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const client = await clientService();
            const database = client.db("database-jaj");
            const collection = database.collection("vicars");
            const allData = await collection.find({}).toArray();
            
            res.status(200).json(allData);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
