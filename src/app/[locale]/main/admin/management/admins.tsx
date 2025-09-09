// "use client";

// import React, { useState } from 'react';
// import { updateUserRole } from '@/api/adminAPI';
// import { User } from '@/types/index';

// interface AdminManagementProps {
//     users: User[];
//     fetchUsers: () => void;
// }

// const AdminManagement = ({ users, fetchUsers }: AdminManagementProps) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const handleRoleUpdate = async (userId: string, currentRole: string) => {
//         setIsLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         const newRole = currentRole === 'admin' ? 'user' : 'admin';

//         const adminCount = users.filter(u => u.role === 'admin').length;
//         if (currentRole === 'admin' && adminCount <= 1) {
//             setError('Cannot demote the last admin.');
//             setIsLoading(false);
//             return;
//         }

//         try {
//             await updateUserRole(userId, newRole);
//             setSuccessMessage(`User role updated to '${newRole}'.`);
//             await fetchUsers();
//         } catch (error: unknown) {
//             console.error('Role update failed:', error);
//             setError((error as Error).message || 'Failed to update user role.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const admins = users.filter(user => user.role === 'admin');
//     const nonAdmins = users.filter(user => user.role !== 'admin');

//     return (
//         <div className="p-8 bg-white rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Admin Role Management</h2>
//             {isLoading && <div className="text-center text-indigo-600 font-medium">Updating role...</div>}
//             {error && <div className="text-center text-red-500 font-medium mt-2">{error}</div>}
//             {successMessage && <div className="text-center text-green-500 font-medium mt-2">{successMessage}</div>}

//             <div className="mb-8">
//                 <h3 className="text-2xl font-semibold text-gray-700 mb-4">Admins ({admins.length})</h3>
//                 <div className="bg-gray-100 rounded-lg p-4">
//                     {admins.length > 0 ? (
//                         <ul className="space-y-4">
//                             {admins.map(user => (
//                                 <li key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-md shadow">
//                                     <div className="flex-1">
//                                         <p className="font-bold text-gray-900 text-lg">{user.name}</p>
//                                         <p className="text-sm text-gray-500">Email: {user.email}</p>
//                                     </div>
//                                     <div className="mt-3 sm:mt-0">
//                                         <button
//                                             onClick={() => handleRoleUpdate(user.id, user.role)}
//                                             disabled={isLoading}
//                                             className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50"
//                                         >
//                                             Demote to User
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500 italic text-center">No admins found.</p>
//                     )}
//                 </div>
//             </div>

//             <div>
//                 <h3 className="text-2xl font-semibold text-gray-700 mb-4">Users ({nonAdmins.length})</h3>
//                 <div className="bg-gray-100 rounded-lg p-4">
//                     {nonAdmins.length > 0 ? (
//                         <ul className="space-y-4">
//                             {nonAdmins.map(user => (
//                                 <li key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-md shadow">
//                                     <div className="flex-1">
//                                         <p className="font-bold text-gray-900 text-lg">{user.name}</p>
//                                         <p className="text-sm text-gray-500">Email: {user.email}</p>
//                                     </div>
//                                     <div className="mt-3 sm:mt-0">
//                                         <button
//                                             onClick={() => handleRoleUpdate(user.id, user.role)}
//                                             disabled={isLoading}
//                                             className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
//                                         >
//                                             Promote to Admin
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500 italic text-center">No users to promote.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminManagement;