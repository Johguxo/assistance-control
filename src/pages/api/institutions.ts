import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../models/interfaces';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await fetch(
                "http://localhost:3001/Institutions", 
                {
                headers: {
                    'type': "json",
                },
            });
            const institutions = await response.json();
            return res.status(200).json(institutions);
        } 
        catch (error) {
            return res.status(500);
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });
};


// con esto traemos la informacion para usar

export const fetchInstitutions = async () => {
    const response = await fetch("/api/institutions");
    if (response.ok) {
        const data = response.json();
        return data;
    } else {
        throw new Error("Error fetching users");
    }
};
