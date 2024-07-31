import { NextApiRequest, NextApiResponse } from "next";
import clientService from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = await clientService();
      const database = client.db("database-jaj");
      const collection = database.collection("users");
      let users = await collection
        .aggregate([
          {
            $lookup: {
              from: "institutions",
              localField: "institution_id",
              foreignField: "_id",
              as: "institution",
            },
          },
          {
            $unwind: {
              path: "$institution",
              preserveNullAndEmptyArrays: true, // This allows users without institutions to be included
            },
          },
          // nuevo 2
          {
            $lookup: {
              from: "deaneries",
              localField: "institution.deanery_id",
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
            $sort: {
              first_name: 1,
            },
          },
          {
            $group: {
              _id: "$_id",
              first_name: { $first: "$first_name" },
              last_name: { $first: "$last_name" },
              date_birth: { $first: "$date_birth" },
              institution: {
                $first: {
                  name: "$institution.name",
                  _id: "$institution._id",
                  type: "$institution.type",
                  address: "$institution.address",
                  deanery: {
                    name: "$deanery.name",
                    _id: "$deanery._id",
                  }
                },
              },
              DNI: { $first: "$DNI" },
              email: { $first: "$email" },
              key: { $first: "$key" },
              phone: { $first: "$phone" },
              have_auth: { $first: "$have_auth" },
              saturday: { $first: "$saturday" },
              sunday: { $first: "$sunday" },
            },
          },
          {
            $sort: {
              first_name: 1,
            },
          },
          // nuevo
          // {
          //   $lookup: {
          //     from: "deanery",
          //     localField: "institution.deanery_id",
          //     foreignField: "_id",
          //     as: "deanery",
          //   },
          // },
          // {
          //   $unwind: {
          //     path: "$deanery",
          //     preserveNullAndEmptyArrays: true,
          //   },
          // },
          // {
          //   $project: {
          //     _id: 1,
          //     first_name: 1,
          //     last_name: 1,
          //     date_birth: 1,
          //     institution: {
          //       name: "$institution.name",
          //       _id: "$institution._id",
          //       type: "$institution.type",
          //       address: "$institution.address",
          //       deanery: {
          //         name: "$deanery.name",
          //         _id: "$deanery._id",
          //       },
          //     },
          //     DNI: 1,
          //     email: 1,
          //     key: 1,
          //     phone: 1,
          //     have_auth: 1,
          //     saturday: 1,
          //     sunday: 1,
          //   },
          // },
          // {
          //   $sort: {
          //     first_name: 1,
          //   },
          // },
          //************ */
          // {
          //   $group: {
          //     _id: "$_id",
          //     first_name: { $first: "$first_name" },
          //     last_name: { $first: "$last_name" },
          //     date_birth: { $first: "$date_birth" },
          //     institution: {
          //       $first: {
          //         name: "$institution.name",
          //         _id: "$institution._id",
          //         type: "$institution.type",
          //         address: "$institution.address",
          //         deanery_id: "$institution.deanary.name"
          //       },
          //     },
          //     DNI: { $first: "$DNI" },
          //     email: { $first: "$email" },
          //     key: { $first: "$key" },
          //     phone: { $first: "$phone" },
          //     have_auth: { $first: "$have_auth" },
          //     saturday: { $first: "$saturday" },
          //     sunday: { $first: "$sunday" },
          //   },
          // },
          // {
          //   $sort: {
          //     first_name: 1,
          //   },
          // },
        ])
        .toArray();
      res.status(200).json(users);
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
