import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tent from "../../../assets/image/camping_tent.jpg";
import LawnMower from "../../../assets/image/lawn_mower.jpg";
import Drill from "../../../assets/image/power_drill.jpg";
import BottomNav from '../components/BottomNav';
import Navbar from "../components/Navbar";
const items = [
    {
        id: 1,
        name: "Power Drill",
        image: Drill, // Correct path from the public directory
        distance: "0.5 miles away",
        listedBy: "John D.",
        description: "Professional-grade electric drill with variable speed control. Includes carrying case and multiple drill bits. Perfect for both DIY projects and professional use.",
        price: 2500,
        availableDates: "Available from July 1st - July 30th"
    },
    {
        id: 2,
        name: "Camping Tent",
        image: Tent, // Correct path from the public directory
        distance: "1.2 miles away",
        listedBy: "Sarah M."
    },
    {
        id: 3,
        name: "Lawn Mower",
        image: LawnMower,// Correct path from the public directory
        distance: "1.8 miles away",
        listedBy: "Mike P."
    }
];

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (item.name === "Power Drill") {
            navigate(`/item/${item.id}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Navbar />
            {/* Search Bar */}
            <div className="p-4 border-b bg-white mt-16"> {/* Added mt-16 to push the search bar below the navbar */}
                <div className="relative w-full max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full border rounded-lg p-2 pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>
            </div>
            {/* Items List */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-16">
                {items
                    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((item) => (
                        <div
                            key={item.id}
                            className={`border rounded-lg overflow-hidden bg-white ${item.name === "Power Drill" ? "cursor-pointer" : ""}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img
                                src={item.image}
                                // alt={item.name}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-500 text-sm">Available • {item.distance}</p>
                                <p className="text-gray-600 text-sm">Listed by {item.listedBy}</p>
                                <button className="mt-3 w-full bg-black text-white py-2 rounded-md">Request</button>
                            </div>
                        </div>
                    ))}
            </div>
            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0">
                <BottomNav />
            </div>
        </div>
    );
};

export default SearchPage;