import NavbarUser from '../components/NavbarUser';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navbar */}
      <NavbarUser />

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900">
          <span className="text-black">Share More,</span>
          <br />
          <span className="text-black">Own Less</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          Join your neighborhood's sharing economy. Borrow what you need, lend what you
          don't use, and connect with your community.
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg text-lg">
          Get Started
        </button>
      </section>

      {/* Popular Categories */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-lg mx-auto mb-4">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{category.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const categories = [
  {
    id: 1,
    name: 'Tools & Equipment',
    description: 'Power tools, garden equipment, and DIY essentials',
    icon: '🔧',
  },
  {
    id: 2,
    name: 'Sports & Recreation',
    description: 'Sports gear, camping equipment, and outdoor items',
    icon: '⚽',
  },
  {
    id: 3,
    name: 'Books & Media',
    description: 'Books, movies, games, and educational materials',
    icon: '📚',
  },
  {
    id: 4,
    name: 'Home & Kitchen',
    description: 'Appliances, party supplies, and household items',
    icon: '🏠',
  },
];

export default HomePage;
