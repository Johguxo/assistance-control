import { NextApiRequest, NextApiResponse } from "next";
// import { Institution } from '@/models/interfaces';
import clientService from "@/app/lib/dbConnect";
//import { dbConnect } from "@/app/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client = await clientService();
    try {
      const database = client.db("database-jaj");
      const collection = database.collection("institutions");
      const allData = await collection
      // desde aqui
      // .aggregate([
      //   {
      //     $lookup: {
      //       from: "deaneries",
      //       localField: "deanery_id", // Este es el campo en la colección institutions
      //       foreignField: "_id", // Este es el campo en la colección deaneries
      //       as: "deaneryD", // Nombre del array en el resultado
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$deaneryD",
      //       preserveNullAndEmptyArrays: true,
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       name: 1,
      //       type: 1,
      //       address: 1,
      //       deanery: {
      //         _id: "$_id", // Referencia al campo de decanato
      //         name: "$name", // Referencia al nombre del decanato
      //       },
      //     },
      //   },
      // ])
      // ***********original****************
        .aggregate([
          {
            $lookup: {
              from: "deanery",
              localField: "deanery_id",
              foreignField: "_id",
              as: "deanery",
            },
          },
          {
            $unwind: {
              path: "$deanery",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              type: { $first: "$type" },
              address: { $first: "$address" },
              deanery: {
                $first: {
                  name: "$deanery.name",
                  _id: "$deanery._id",
                },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(allData);
    } catch (error) {
      console.error("Error connecting to the database:", error);
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      //client.close()
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
