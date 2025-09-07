import { User } from '@/types/index';

const getAuthToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    return token;
};

const API_BASE_URL = 'http://localhost:5203/api/v1';

export const fetchUsers = async (): Promise<User[]> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token not found. Please log in.");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Unauthorized: You do not have permission to view this content.');
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const usersData = await response.json();
        return usersData;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// export const updateUserRole = async (userId: string, newRole: string) => {
//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Authentication token not found. Please log in.");
//     }

//     try {
//         const response = await fetch(`${API_BASE_URL}/users/role/${userId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ role: newRole }),
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to update user role: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error updating user role:", error);
//         throw error;
//     }
// };

// export const deleteUser = async (userId: string) => {
//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Authentication token not found. Please log in.");
//     }

//     try {
//         const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to delete user: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         throw error;
//     }
// };