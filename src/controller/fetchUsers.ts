import axios from 'axios';

export const fetchUsers = async (query: Object) => {
    try {
        const response = await axios.get('/api/users', { params: query });
        if (!response.status) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};