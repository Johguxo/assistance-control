import { urlBase } from "@/app/lib/config";
import axios from "axios";

export const updateUserField = async (
    userId: string,
    field: "saturday" | "sunday" | "have_auth",
    value: boolean
) => {
    try {
        const response = await axios.patch(`${urlBase}/users/${userId}`, 
            { 
                [field]: value 
            }
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
