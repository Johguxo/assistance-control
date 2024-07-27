import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../models/interfaces';


export default async (req: NextApiRequest, res: NextApiResponse) => {

        if (req.method === 'GET') {

            const response =
                await fetch(
                    "http://localhost:3001/Users",
                    {
                        headers: {
                            'type': "json",
                        },
                    }
                );
            const users = await response.json();
            return res.status(200).json(users);
        }
        return res.status(400).json(
            {
                error: 'Invalid request method'
            }
        );


    }

// con esto traemos la informacion para usar

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("/api/users");
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error fetching users");
    }
};