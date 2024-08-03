import { urlBase } from "@/app/lib/config";
import axios from "axios";

export const fetchDataGraphs = async () => {
    try {
        const response = await axios.get("http://localhost:5000/data");
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};