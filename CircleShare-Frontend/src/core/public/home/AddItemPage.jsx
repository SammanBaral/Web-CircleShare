import BottomNav from "@/core/public/components/BottomNav";
import Navbar from "@/core/public/components/Navbar";
import { useState } from "react";

const AddItemPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        description: "",
        availabilityStatus: "available",
        locationId: "",
        imageFile: null,
        rulesNotes: "",
        price: "",
        condition: "",
        maxBorrowDuration: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imageFile) {
            alert("Please select an image.");
            return;
        }

        const itemData = new FormData();
        // Add all form fields to the FormData
        Object.keys(formData).forEach(key => {
            if (key === 'imageFile') {
                itemData.append("imageFile", formData.imageFile);
            } else {
                itemData.append(key, formData[key]);
            }
        });

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/items/create", {
                method: "POST",
                body: itemData, // Send FormData directly (don't set Content-Type header)
            });

            const responseData = await response.json();
            if (response.ok) {
                alert("Item added successfully!");
                setFormData({
                    name: "",
                    categoryId: "",
                    description: "",
                    availabilityStatus: "available",
                    locationId: "",
                    imageFile: null,
                    rulesNotes: "",
                    price: "",
                    condition: "",
                    maxBorrowDuration: "",
                });
            } else {
                alert("Error: " + responseData.error);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading item!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="65bf12e789ab45d123456711">Tools</option>
                                    <option value="65bf12f489ab45d123456712">Electronics</option>
                                    <option value="65bf130589ab45d123456713">Clothing</option>
                                    <option value="65bf131089ab45d123456714">Sports</option>
                                    <option value="65bf132189ab45d123456715">Furniture</option>
                                    <option value="65bf133289ab45d123456716">Books</option>
                                    <option value="65bf134389ab45d123456717">Vehicles</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Availability</label>
                                <select
                                    name="availabilityStatus"
                                    value={formData.availabilityStatus}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <select
                                    name="locationId"
                                    value={formData.locationId}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Location</option>
                                    <option value="65bf12e789ab45d123456793">Kathmandu</option>
                                    <option value="65bf12f489ab45d123456794">Lalitpur</option>
                                    <option value="65bf130589ab45d123456795">Bhaktapur</option>
                                    <option value="65bf136789ab45d123456796">Pokhara</option>
                                    <option value="65bf137889ab45d123456797">Chitwan</option>
                                    <option value="65bf138989ab45d123456798">Biratnagar</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="file"
                                    name="imageFile"
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Rules/Notes</label>
                                <textarea
                                    name="rulesNotes"
                                    value={formData.rulesNotes}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Condition</label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Condition</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price (¥)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Max Borrow Duration (days)</label>
                                <input
                                    type="number"
                                    name="maxBorrowDuration"
                                    value={formData.maxBorrowDuration}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    min="0"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-2 rounded-md ${isLoading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
                                    } text-white`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "List Item"}
                            </button>
                        </form>
                    </div>

                    {/* Guidelines Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Guidelines for Adding Items</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Ensure the item is in good condition and functional.</li>
                            <li>Provide a clear and accurate description of the item.</li>
                            <li>Upload high-quality images that show the item clearly.</li>
                            <li>Specify the availability status and location accurately.</li>
                            <li>Set a reasonable price based on the item's condition and market value.</li>
                            <li>Include any rules or notes that borrowers should be aware of.</li>
                            <li>Ensure the item is clean and ready for use before lending it out.</li>
                        </ul>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default AddItemPage;