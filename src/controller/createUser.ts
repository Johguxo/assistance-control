import { urlBase } from "@/app/lib/config";
import axios from "axios";

export const createUser = async (
    body: any
) => {
    try {
        const response = await axios.post(`${urlBase}/users/by-admin`, 
          body
        , {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.status) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};
