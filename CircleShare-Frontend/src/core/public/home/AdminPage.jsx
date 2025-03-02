import CategoriesManagement from "@/core/private/categoriesManagement";
import ItemManagement from "@/core/private/itemManagement";
import UserManagement from "@/core/private/userManagement";
import BottomNav from "@/core/public/components/BottomNav";
import Navbar from "@/core/public/components/Navbar";
import { useState } from 'react';

const AdminDashboard = () => {
    const [systemStatus] = useState("Operational");
    const [currentView, setCurrentView] = useState("dashboard");

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const renderView = () => {
        switch (currentView) {
            case "userManagement":
                return <UserManagement />;
            case "categoriesManagement":
                return <CategoriesManagement />;
            case "itemManagement":
                return <ItemManagement />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-6 md:py-12 mt-16">
                <div className="max-w-6xl mx-auto p-6 space-y-6">
                    {/* Top Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-gray-500 text-sm">Member Since</h3>
                            <p className="text-2xl font-bold">2022</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-gray-500 text-sm">Total Reviews</h3>
                            <p className="text-2xl font-bold">48</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-gray-500 text-sm">Community Rating</h3>
                            <p className="text-2xl font-bold">4.8</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <h3 className="text-gray-500 text-sm">Total Users</h3>
                            <p className="text-2xl font-bold">1,234</p>
                        </div>
                    </div>

                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Recent User Activities */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-3">Recent User Activities</h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>New Users Today: <span className="font-bold">124</span></li>
                                <li>Active Listings: <span className="font-bold">1,432</span></li>
                                <li>Pending Reviews: <span className="font-bold">28</span></li>
                                <li>Support Tickets: <span className="font-bold">12</span></li>
                            </ul>
                        </div>

                        {/* Site Statistics */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-3">Site Statistics</h3>
                            <p className="text-green-600 font-semibold">{systemStatus}</p>
                            <div className="mt-2">
                                <p className="text-gray-600">Server Load</p>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div className="w-3/5 h-2 bg-black rounded-full"></div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-gray-600">Storage Usage</p>
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div className="w-2/5 h-2 bg-black rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-2">Last Backup: Today, 04:30 AM</p>
                        </div>

                        {/* Management Center */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-3">Management Center</h3>
                            <button onClick={() => handleViewChange("userManagement")} className="w-full bg-black text-white py-2 rounded-md mb-2 hover:bg-gray-800">User Management</button>
                            <button onClick={() => handleViewChange("categoriesManagement")} className="w-full bg-black text-white py-2 rounded-md mb-2 hover:bg-gray-800">Categories Management</button>
                            <button onClick={() => handleViewChange("itemManagement")} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">Item Management</button>
                        </div>
                    </div>

                    {/* Render the selected view */}
                    {renderView()}

                    {/* System Activity Log */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">System Activity Log</h3>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <p className="text-gray-700"><span className="font-semibold">Emma W.</span> listed a new item: <span className="font-bold">Electric Lawn Mower</span></p>
                                <span className="text-gray-500 text-sm">2 hours ago</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <p className="text-gray-700"><span className="font-semibold">David L.</span> borrowed <span className="font-bold">Pressure Washer</span> from Tom K.</p>
                                <span className="text-gray-500 text-sm">5 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

const Dashboard = () => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Dashboard</h3>
        {/* Add dashboard content here */}
    </div>
);

export default AdminDashboard;