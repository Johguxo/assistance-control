import { NextApiRequest, NextApiResponse } from "next";

export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const { id } = query; // Obtiene el ID de la URL

    if (method === 'GET') {
        try {
            if (id) {
                const response = await fetch(`http://localhost:3001/Users/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    return res.status(response.status).json({ error: 'User not found' });
                }

                const user = await response.json();
                return res.status(200).json(user);
            }
            return res.status(400).json({ error: 'ID is required' });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ error: 'Error fetching user' });
        }
    }

    return res.status(400).json({ error: 'Invalid request method' });
};

// con esto traemos la informacion para usar

export const fetchUserById = async (id: string) => {
    const response = await fetch(
        `/api/users/${id}`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
    }
    return response.json();
};
