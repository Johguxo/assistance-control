export const updateUserDay = async (userId: string, day: 'saturday' | 'sunday', checked: boolean): Promise<void> => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [day]: checked }),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    } catch (error) {
        console.error('Error updating the user:', error);
    }
};
