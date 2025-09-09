// "use client";

// import React, { useState } from 'react';
// import { deleteUser } from '@/api/adminAPI';
// import { User } from '@/types/index';

// interface UserManagementProps {
//     users: User[];
//     fetchUsers: () => void;
// }

// const UserManagement = ({ users, fetchUsers }: UserManagementProps) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const handleDeleteUser = async (userId: string) => {
//         setIsLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         try {
//             await deleteUser(userId);
//             setSuccessMessage('User deleted successfully.');
//             await fetchUsers();
//         } catch (error: unknown) {
//             console.error('User deletion failed:', error);
//             setError((error as Error).message || 'Failed to delete user.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const normalUsers = users.filter(user => user.role === 'user');

//     return (
//         <div className="p-8 bg-white rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">User Management</h2>
//             {isLoading && <div className="text-center text-indigo-600 font-medium">Processing...</div>}
//             {error && <div className="text-center text-red-500 font-medium mt-2">{error}</div>}
//             {successMessage && <div className="text-center text-green-500 font-medium mt-2">{successMessage}</div>}

//             <div className="bg-gray-100 rounded-lg p-4">
//                 {normalUsers.length > 0 ? (
//                     <ul className="space-y-4">
//                         {normalUsers.map(user => (
//                             <li key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-md shadow">
//                                 <div className="flex-1">
//                                     <p className="font-bold text-gray-900 text-lg">{user.name}</p>
//                                     <p className="text-sm text-gray-500">Email: {user.email}</p>
//                                 </div>
//                                 <div className="mt-3 sm:mt-0">
//                                     <button
//                                         onClick={() => handleDeleteUser(user.id)}
//                                         disabled={isLoading}
//                                         className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
//                                     >
//                                         Delete User
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-500 italic text-center">No users to manage.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserManagement;