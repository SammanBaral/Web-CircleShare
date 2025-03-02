import { useEffect, useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from an API or use a static list for demonstration
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found, please log in again.");
                }

                const response = await fetch('http://localhost:3000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const result = await response.json();
                console.log("Fetched Data:", result); // Debugging

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch users");
                }

                if (Array.isArray(result.data)) {
                    setUsers(result.data);
                } else {
                    throw new Error("Data is not an array");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdate = (userId) => {
        // Handle update logic here
        console.log(`Update user with ID: ${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage or any other storage
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the authorization header
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">User Management</h3>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user._id}</td>
                            <td className="py-2 px-4 border-b">{user.firstName ? `${user.firstName} ${user.lastName}` : user.username}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleUpdate(user._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;