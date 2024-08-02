import { urlBase } from "@/app/lib/config";
import axios from "axios";

export const fetchDeaneries = async () => {
    try {
        const response = await axios.get(`${urlBase}/deaneries`);
        if (!response.status) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};