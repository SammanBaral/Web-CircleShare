import BottomNav from '../components/BottomNav';
 // Adjust path as needed
 import React from 'react';

const DashboardPage = () => {
    // Sample data (replace with real data from props, context, or API)
    const stats = [
        { label: 'Total Items Shared', value: 156 },
        { label: 'Active Loans', value: 12 },
        { label: 'Community Rating', value: 4.8 },
        { label: 'Pending Requests', value: 5 },
    ];

    const borrowingItems = [
        { id: 1, name: 'Power Drill', status: 'Due in 2 days' },
        { id: 2, name: 'Camping Tent', status: 'Due in 5 days' },
    ];

    const lendingItems = [
        { id: 3, name: 'DSLR Camera', status: 'Requested by Sarah M.', isActive: false },
        { id: 4, name: 'Mountain Bike', status: 'Requested by Mike P.', isActive: false },
    ];

    const neighborhoodActivity = [
        {
            id: 1,
            user: 'Emma K.',
            action: 'listed a new item',
            item: 'Electric Lawn Mower',
            time: '3 hours ago',
        },
        {
            id: 2,
            user: 'David L.',
            action: 'borrowed',
            item: 'Pressure Washer from Tom K.',
            time: '5 hours ago',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Top Bar */}
          <>Nav</>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-sm p-4 text-center">
                            <h3 className="text-xl font-bold">{stat.value}</h3>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </section>

                {/* Items Borrowing & Lending */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Borrowing */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h2 className="text-lg font-semibold mb-4">Items You're Borrowing</h2>
                        {borrowingItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-gray-50 rounded-md p-3 mb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.status}</p>
                                </div>
                                <button className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800">
                                    Return
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Lending */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h2 className="text-lg font-semibold mb-4">Items You're Lending</h2>
                        {lendingItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-gray-50 rounded-md p-3 mb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.status}</p>
                                </div>
                                {item.isActive ? (
                                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
                                        Active
                                    </span>
                                ) : (
                                    <button className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800">
                                        Accept
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Neighborhood Activity */}
                <section className="bg-white rounded-lg shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-4">Neighborhood Activity</h2>
                    <div className="space-y-3">
                        {neighborhoodActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-3">
                                <img
                                    src="https://via.placeholder.com/32"
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <p className="text-sm">
                                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                                    <span className="font-medium">{activity.item}</span> - {activity.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation (Now a separate component) */}
            <BottomNav />
        </div>
    );
};

export default DashboardPage;
