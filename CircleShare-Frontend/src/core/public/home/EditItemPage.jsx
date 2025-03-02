import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';

const EditItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: '',
        categoryId: '',
        description: '',
        availabilityStatus: 'available',
        locationId: '',
        imageFile: null,
        rulesNotes: '',
        price: '',
        condition: '',
        maxBorrowDuration: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the item details from the backend using the id
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/items/67c37203ab3b74a81f5ac7a3`);
                const data = await response.json();
                setItem(data);
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Error fetching item details');
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setItem((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log('Item updated:', item);

        const itemData = new FormData();
        Object.keys(item).forEach(key => {
            itemData.append(key, item[key]);
        });

        try {
            const response = await fetch(`http://localhost:3000/api/items/67c37203ab3b74a81f5ac7a3`, {
                method: 'PUT',
                body: itemData,
            });

            const contentType = response.headers.get('content-type');
            let responseData;
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (response.ok) {
                alert('Item updated successfully!');
                navigate('/profile');
            } else {
                alert('Error: ' + responseData.error || responseData);
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating item!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            <main className="flex-grow flex flex-col items-center p-6 mt-16">
                <div className="w-full max-w-md space-y-4">
                    <h2 className="text-lg font-semibold">Edit Item</h2>
                    <form onSubmit={handleSave} encType="multipart/form-data" className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Item Name</label>
                            <input
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Item Name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="categoryId"
                                value={item.categoryId}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Category ID"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={item.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Description"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Availability Status</label>
                            <select
                                name="availabilityStatus"
                                value={item.availabilityStatus}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                                <option value="reserved">Reserved</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="locationId"
                                value={item.locationId}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Location ID"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Item Image</label>
                            <input
                                type="file"
                                name="imageFile"
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rules/Notes</label>
                            <textarea
                                name="rulesNotes"
                                value={item.rulesNotes}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Rules/Notes"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Condition</label>
                            <select
                                name="condition"
                                value={item.condition}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                            >
                                <option value="new">New</option>
                                <option value="used">Used</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price (¥)</label>
                            <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Price"
                                min="0"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Max Borrow Duration (days)</label>
                            <input
                                type="number"
                                name="maxBorrowDuration"
                                value={item.maxBorrowDuration}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                placeholder="Max Borrow Duration"
                                min="0"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FiSave /> Save
                        </button>
                    </form>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default EditItemPage;