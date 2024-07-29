export const fetchDeaneries = async () => {
    try {
        const response = await fetch('/api/deaneries');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};