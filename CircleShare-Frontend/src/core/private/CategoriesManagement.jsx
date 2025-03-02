import React, { useEffect, useState } from 'react';

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        // Fetch categories from an API or use a static list for demonstration
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Fetched data:', result); // Log the response data
                if (Array.isArray(result.data)) {
                    setCategories(result.data);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategory }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setCategories([...categories, result.data]);
            setNewCategory('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async (categoryId, newName) => {
        try {
            const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setCategories(categories.map(category => category._id === categoryId ? result.data : category));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setCategories(categories.filter(category => category._id !== categoryId));
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
            <h3 className="text-lg font-semibold mb-4">Categories Management</h3>
            <div className="mb-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category Name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Category
                </button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td className="py-2 px-4 border-b">{category._id}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="text"
                                    value={category.name}
                                    onChange={(e) => handleUpdate(category._id, e.target.value)}
                                    className="border p-2 w-full"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleDelete(category._id)}
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

export default CategoriesManagement;