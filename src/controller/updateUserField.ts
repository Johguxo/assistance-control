export const updateUserField = async (
    userId: string,
    field: "saturday" | "sunday" | "have_auth",
    value: boolean
) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
    });
    return response.json();
};
