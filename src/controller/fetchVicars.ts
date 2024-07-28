export const fetchVicars = async () => {
    try {
        const response = await fetch('/api/vicars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dataaaa:', error);
        throw error;
    }
};