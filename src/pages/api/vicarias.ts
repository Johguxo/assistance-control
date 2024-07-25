import { NextApiRequest, NextApiResponse } from "next";

const getVicarias =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {

        if (req.method === 'GET') {
            const response =
                await fetch(
                    "http://localhost:3001/vicarias",
                    {
                        headers: {
                            'type': "json",
                        },
                    });
            const users = await response.json();
            return res.status(200).json(users);
        }
        return res.status(400).json(
            { 
                error: 'Invalid request method' 
            }
        );


    }



export default getVicarias;