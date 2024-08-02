import { NextApiRequest, NextApiResponse } from "next";
import clientService from '@/app/lib/dbConnect';
//import { dbConnect } from "@/app/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const client = await clientService();
        try {
            const database = client.db("database-jaj");
            const collection = database.collection("deanery");
            const allData = await collection.find({}).toArray();
            
            res.status(200).json(allData);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            //client.close()
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
