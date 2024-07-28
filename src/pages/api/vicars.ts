import { NextApiRequest, NextApiResponse } from "next";
import clientService from '@/lib/dbConnect';
import { Int32 } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const client = await clientService();
            const database = client.db("database-jaj");
            const collection = database.collection('vicars');

            const vicars = await collection.aggregate([
                {
                  $lookup: {
                    from: 'deanery',
                    localField: '_id',
                    foreignField: 'vicariate_id',
                    as: 'deaneries'
                  }
                },
                {
                  $unwind: {
                    path: '$deaneries',
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    deaneries: {
                      $push: {
                        name: '$deaneries.name',
                      }
                    }
                  }
                }
              ]).toArray();
            res.status(200).json(vicars);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
