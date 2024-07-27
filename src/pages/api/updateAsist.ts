import { NextApiRequest, NextApiResponse } from "next";

const updateAsist = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { id, sabado, domingo } = req.body;

        try {
            // Aquí debes implementar la lógica real para actualizar el usuario en la base de datos
            // Por ejemplo, podrías utilizar un modelo de base de datos como:
            // const updatedUser = await UserModel.findByIdAndUpdate(id, { sabado, domingo }, { new: true });
            
            // Retorna el usuario actualizado (esto debe ser reemplazado por la respuesta real de la base de datos)
            return res.status(200).json({ id, sabado, domingo });
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid request method' });
    }
};

export default updateAsist;
