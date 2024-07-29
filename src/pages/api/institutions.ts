import { NextApiRequest, NextApiResponse } from "next";
// import { Institution } from '@/models/interfaces';
import clientService from "@/lib/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            console.log(req.query)
            const client = await clientService();
            const database = client.db("database-jaj");
            const collection = database.collection("institutions");
            const allData = await collection.find({ type: 1 }).toArray();
            res.status(200).json(allData);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });
};

