import { NextApiRequest, NextApiResponse } from "next";
//import clientService from '@/lib/dbConnect';
//import { dbConnect } from "@/app/lib/db";
import clientService from "@/app/lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      const client = await clientService();
        try {
            const database = client.db("database-jaj");
            const collection = database.collection('vicars');
            const data = {}
            await collection.insertOne({
              writeConcern: data
            })
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
                        _id: '$deaneries._id',
                      }
                    }
                  }
                }
              ]).sort({"name": 1}).toArray();
            res.status(200).json(vicars);
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
