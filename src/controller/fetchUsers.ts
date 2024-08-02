import { urlBase } from '@/app/lib/config';
import axios from 'axios';

export const fetchUsers = async (query: Object) => {
    try {
        console.log(`${urlBase}}/users`)
        const response = await axios.get(`${urlBase}/users`, { params: query });
        if (!response.status) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};