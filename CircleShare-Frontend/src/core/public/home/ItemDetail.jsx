import BottomNav from "@/core/public/components/BottomNav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Drill from "../../../assets/image/power_drill.jpg";
import Navbar from "../components/Navbar";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [showEmail, setShowEmail] = useState(false);
    const [isRequestPending, setIsRequestPending] = useState(false);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                if (id === "1") {
                    const powerDrill = {
                        id: 1,
                        name: "Power Drill",
                        image: "power-drill.png",
                        distance: "0.5 miles away",
                        listedBy: "John D.",
                        description: "Professional-grade electric drill with variable speed control. Includes carrying case and multiple drill bits. Perfect for both DIY projects and professional use.",
                        price: 2500,
                        availableDates: "Available from July 1st - July 30th"
                    };
                    setItem(powerDrill);
                } else {
                    // Handle other items if necessary
                    const response = await fetch(`http://localhost:4000/api/items/${id}`);
                    const data = await response.json();
                    setItem(data);
                }
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const owner = {
        name: "Sarah Johnson",
        rating: 4.9,
        memberSince: 2021,
        email: "sarah.johnson@example.com",
    };

    const handleRequestClick = () => {
        setIsRequestPending(true);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-6 md:py-12 mt-16">
                <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 rounded-lg shadow-lg">
                    {/* Left Section - Item Details */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <div className="flex items-center mt-1">
                            <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
                            <span className="ml-2 text-gray-600">(4.5)</span>
                        </div>

                        { /* Images */}
                        <div className="flex space-x-2 mt-4">
                            <img src={Drill} alt={item.name} className="w-full h-60 object-cover rounded-md" />
                        </div>

                        {/* Description */}
                        <h3 className="mt-4 font-semibold">Description</h3>
                        <p className="text-gray-600 text-sm">
                            {item.description}
                        </p>

                        {/* Price & Availability */}
                        <div className="mt-4">
                            <h3 className="font-semibold">Daily Rate</h3>
                            <p className="text-xl font-bold">¥{item.price}</p>

                            <h3 className="mt-2 font-semibold">Available Dates</h3>
                            <p className="bg-gray-200 p-2 rounded-md text-gray-700 text-sm">{item.availableDates}</p>
                        </div>

                        {/* Borrow Button */}
                        <button
                            onClick={handleRequestClick}
                            className={`mt-4 w-full py-2 rounded-md ${isRequestPending ? "bg-gray-500" : "bg-black hover:bg-gray-800"} text-white`}
                            disabled={isRequestPending}
                        >
                            {isRequestPending ? "Request Pending" : "Request to Borrow"}
                        </button>
                    </div>

                    {/* Right Section - Owner Information */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Owner Information</h3>

                        <div className="flex items-center space-x-4 mt-4">
                            <img src="https://robohash.org/847c31bb5196698b6bfd81a32f110561?set=set4&bgset=&size=400x400" alt="Owner" className="w-12 h-12 rounded-full" />
                            <div>
                                <h4 className="font-semibold">{owner.name}</h4>
                                <div className="flex items-center">
                                    <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
                                    <span className="ml-2 text-gray-600">({owner.rating})</span>
                                </div>
                                <p className="text-gray-500 text-sm">Member since {owner.memberSince}</p>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <button
                            onClick={() => setShowEmail(!showEmail)}
                            className="mt-4 w-full border border-black text-black py-2 rounded-md hover:bg-gray-100"
                        >
                            Contact Owner
                        </button>

                        {/* Show Email when clicked */}
                        {showEmail && <p className="mt-2 text-center text-blue-600">{owner.email}</p>}
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default ItemDetails;