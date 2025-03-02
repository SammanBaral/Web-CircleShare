import Navbar from '@/core/public/components/Navbar';
import { useState } from 'react';
import BottomNav from '../../public/components/BottomNav';

const DashboardPage = () => {
  // Sample data (replace with real data from props, context, or API)
  const stats = [
    { label: 'Total Items Shared', value: 156 },
    { label: 'Active Loans', value: 2 },
    { label: 'Community Rating', value: 4.8 },
    { label: 'Pending Requests', value: 2 },
  ];

  const initialBorrowingItems = [
    { id: 1, name: 'Power Drill', status: 'Due in 2 days', initiated: false },
    { id: 2, name: 'Camping Tent', status: 'Due in 5 days', initiated: false },
  ];

  const initialLendingItems = [
    { id: 3, name: 'DSLR Camera', status: 'Borrowed by Sarah M.', isActive: true, initiated: false },
    { id: 4, name: 'Mountain Bike', status: 'Borrowed by Mike P.', isActive: true, initiated: false },
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

  const [borrowingItems, setBorrowingItems] = useState(initialBorrowingItems);
  const [lendingItems, setLendingItems] = useState(initialLendingItems);
  const [pendingRequests, setPendingRequests] = useState(stats.find(stat => stat.label === 'Pending Requests').value);
  const [activeLoans, setActiveLoans] = useState(stats.find(stat => stat.label === 'Active Loans').value); // ✅ Track active loans

  const handleReturnInitiated = (id) => {
    setBorrowingItems(borrowingItems.map(item => 
      item.id === id ? { ...item, initiated: true } : item
    ));
    
    // ✅ Decrease active loans only if it was active
    if (activeLoans > 0) {
      setActiveLoans(prev => prev - 1);
    }
  };

  const handleAskBackInitiated = (id) => {
    setLendingItems(lendingItems.map(item => 
      item.id === id ? { ...item, initiated: true } : item
    ));
    setPendingRequests(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Top Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 mt-20">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-4 text-center">
              <h3 className="text-xl font-bold">
                {stat.label === 'Pending Requests' ? pendingRequests 
                : stat.label === 'Active Loans' ? activeLoans 
                : stat.value}
              </h3>
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
              <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-md p-3 mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <button
                  className={`text-sm px-3 py-1 rounded ${item.initiated ? 'bg-gray-300 text-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}
                  onClick={() => handleReturnInitiated(item.id)}
                  disabled={item.initiated}
                >
                  {item.initiated ? 'Initiated' : 'Return'}
                </button>
              </div>
            ))}
          </div>

          {/* Lending */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Items You're Lending</h2>
            {lendingItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-md p-3 mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <button
                  className={`text-sm px-3 py-1 rounded ${item.initiated ? 'bg-gray-300 text-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}
                  onClick={() => handleAskBackInitiated(item.id)}
                  disabled={item.initiated}
                >
                  {item.initiated ? 'Initiated' : 'Ask Back'}
                </button>
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
                  src="https://gravatar.com/avatar/847c31bb5196698b6bfd81a32f110561?s=400&d=robohash&r=x"
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
