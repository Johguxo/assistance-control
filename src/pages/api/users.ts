import { NextApiRequest, NextApiResponse } from "next";
import clientService from '@/lib/dbConnect';
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const client = await clientService();
            const database = client.db("database-jaj");
            const collection = database.collection("users");
            const allData = await collection.find({}).toArray();
            
            res.status(200).json(allData);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else if (req.method === "PATCH") {
        const { id, ...updateFields } = req.body;

        try {
            const client = await clientService();
            const database = client.db("database-jaj");
            const collection = database.collection("users");

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error updating the user:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
