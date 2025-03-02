import { useEffect, useState } from 'react';
import { FiEdit, FiLogOut, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [showPending, setShowPending] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requests, setRequests] = useState([
        { id: "67c3722aab3b74a81f5ac7a5", item: 'Power Drill', days: 3, status: 'pending' },
        { id: "67c37203ab3b74a81f5ac7a3", item: 'Pressure Washer', days: 5, status: 'pending' },
    ]);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [items, setItems] = useState([
        { id: "67c3cca6f43d09bc0ba6ef39", name: 'Power Drill', editable: false },
        { id: "67c37203ab3b74a81f5ac7a3", name: 'Pressure Washer', editable: false },
    ]);

    useEffect(() => {
        // Simulate fetching user data
        const user = {
            firstName: 'Samman',
            lastName: 'Baral',
            email: 'samman@gmail.com',
            phone: '9800000000',
        };
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setLoading(false);
    }, []);

    const handleUpdateProfile = () => {
        console.log('Profile updated');
        setProfileUpdated(true);
        setTimeout(() => setProfileUpdated(false), 3000); // Hide the message after 3 seconds
    };

    const handleAcceptRequest = (id) => {
        console.log(`Accepted request with id: ${id}`);
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
    };

    const handleIgnoreRequest = (id) => {
        console.log(`Ignored request with id: ${id}`);
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'ignored' } : req));
    };

    const handleEditItem = (id) => {
        navigate(`/edit-item/${id}`);
    };

    const handleLogout = () => {
        navigate('/login');
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
                    {/* Pending Requests Button */}
                    <button
                        onClick={() => setShowPending(!showPending)}
                        className="w-full bg-black text-white p-4 rounded-md flex justify-between items-center"
                    >
                        Pending Requests <span className="bg-white text-black px-3 py-1 rounded-full text-sm">{requests.length}</span>
                    </button>
                    {showPending && (
                        <div className="bg-white p-4 rounded-md shadow space-y-4">
                            {requests.map(req => (
                                <div key={req.id} className="flex justify-between items-center">
                                    <p className="text-sm">🔹 Request for {req.item} for {req.days} days</p>
                                    <div>
                                        {req.status === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleAcceptRequest(req.id)}
                                                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleIgnoreRequest(req.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    Ignore
                                                </button>
                                            </>
                                        ) : (
                                            <span className={`px-2 py-1 rounded-md ${req.status === 'accepted' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* My Items Button */}
                    <button
                        onClick={() => setShowItems(!showItems)}
                        className="w-full bg-black text-white p-4 rounded-md flex justify-between items-center"
                    >
                        My Items <span className="bg-white text-black px-3 py-1 rounded-full text-sm">{items.length}</span>
                    </button>
                    {showItems && (
                        <div className="bg-white p-4 rounded-md shadow space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <p className="text-sm">📦 {item.name}</p>
                                    <button
                                        onClick={() => handleEditItem(item.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* My Profile (Editable) */}
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                        <h2 className="text-lg font-semibold">My Profile</h2>
                        <div className="flex items-center border rounded-lg p-2">
                            <FiUser className="text-gray-500" />
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 focus:outline-none" />
                        </div>
                        <div className="flex items-center border rounded-lg p-2">
                            <FiUser className="text-gray-500" />
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 focus:outline-none" />
                        </div>
                        <div className="flex items-center border rounded-lg p-2">
                            <FiMail className="text-gray-500" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 focus:outline-none" />
                        </div>
                        <div className="flex items-center border rounded-lg p-2">
                            <FiPhone className="text-gray-500" />
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 focus:outline-none" />
                        </div>
                        <button
                            onClick={handleUpdateProfile}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FiEdit /> Update Profile
                        </button>
                        {profileUpdated && <p className="text-green-500 text-center">Profile updated</p>}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white p-2 rounded-lg flex items-center justify-center gap-2 mt-4"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default ProfilePage;