import { NextApiRequest, NextApiResponse } from "next";
import clientService from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let findAllUsers = true;  // se cambio el dato a true
      let findByType = false;
      let queryFilterUsers = 0
      if ("type" in req.query) {
        if (req.query["type"] != "0") {
          findByType = true;
          //queryFilterUsers = parseInt(req.query["type"]);
        } else {
          findAllUsers = true;
        }
      }
      const client = await clientService();
      const database = client.db("database-jaj");
      const collection = database.collection("users");
      let users = [];
      if (findAllUsers) {
        users = await collection
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
          ])
          .toArray();
      } else {
        if (queryFilterUsers) {
          users = await collection
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
              {
                $match: {
                  "institution.type": queryFilterUsers,
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
            ])
            .toArray();
        } else {
          users = await collection
            .aggregate([
              {
                $match: {
                  institution_id: { $exists: false },
                },
              },
              {
                $group: {
                  _id: "$_id",
                  first_name: { $first: "$first_name" },
                  last_name: { $first: "$last_name" },
                  date_birth: { $first: "$date_birth" },
                  institution: { $first: null },
                  DNI: { $first: "$DNI" },
                  email: { $first: "$email" },
                  key: { $first: "$key" },
                  phone: { $first: "$phone" },
                  have_auth: { $first: "$have_auth" },
                  saturday: { $first: "$saturday" },
                  sunday: { $first: "$sunday" },
                },
              },
            ])
            .toArray();
        }
      }

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
