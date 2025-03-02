import { useEffect, useState } from 'react';

const ItemManagement = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch items from an API or use a static list for demonstration
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/items');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Fetched data:', result); // Check the structure in the console

                // Ensure we only set items if result is an array
                if (Array.isArray(result)) {
                    setItems(result);
                } else if (result.data && Array.isArray(result.data)) {
                    setItems(result.data);
                } else {
                    console.error("Unexpected response format:", result);
                    throw new Error("Data is not an array");
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleUpdate = (itemId) => {
        // Handle update logic here
        console.log(`Update item with ID: ${itemId}`);
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
            }
            setItems(items.filter(item => item._id !== itemId));
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
            <h3 className="text-lg font-semibold mb-4">Item Management</h3>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td className="py-2 px-4 border-b">{item._id}</td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.description}</td>
                            <td className="py-2 px-4 border-b">{item.categoryId}</td>
                            <td className="py-2 px-4 border-b">

                                <button
                                    onClick={() => handleDelete(item._id)}
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

export default ItemManagement;