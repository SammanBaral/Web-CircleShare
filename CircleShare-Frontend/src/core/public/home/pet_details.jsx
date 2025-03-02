import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PetDetailsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Example pet data - in a real app, you would fetch this based on the ID
  const pets = [
    {
      id: 1,
      name: "Munchkins",
      location: "Nepal",
      type: "Cat",
      breed: "Persian Mix",
      age: "1 year",
      gender: "Female",
      weight: "3.5 kg",
      price: "$800",
      description: "Munchkins is a beautiful Persian Mix cat with a playful personality. She loves to cuddle and play with toys.",
      color: "Orange and White",
      vaccinated: true,
      images: [
        "src/assets/image/cat/persian 1.jpg",
        "src/assets/image/cat/persian 2.jpg",
        "src/assets/image/cat/persian 3.jpg"
      ]
    },
    {
      id: 2,
      name: "Luna",
      location: "Kathmandu",
      type: "Dog",
      breed: "Husky",
      age: "2 years",
      gender: "Female",
      weight: "20 kg",
      price: "$1200",
      description: "Luna is an energetic Husky with striking blue eyes. She's well-trained and loves outdoor activities.",
      color: "Gray and White",
      vaccinated: true,
      images: [
        "src/assets/image/dog/download1.jpeg",
        "src/assets/image/dog/download2.jpeg",
        "src/assets/image/dog/download3.jpeg"
      ]
    }
  ];

  // Find the pet based on ID
  useEffect(() => {
    const findPet = pets.find(p => p.id === Number(id));
    if (findPet) {
      setPet(findPet);
    }
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#e5f2f7]">
        <Navbar />
        <div className="pt-32 px-4 text-center">
          <p>Loading pet details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5f2f7]">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-500">
            <ol className="list-none p-0 flex">
              <li className="flex items-center">
                <Link to="/" className="text-[#2196f3]">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to={`/${pet.type.toLowerCase()}`} className="text-[#2196f3]">{pet.type}</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-700">{pet.name}</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Pet Details Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Left Column - Images */}
              <div>
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={pet.images[selectedImage]} 
                    alt={pet.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {pet.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                        selectedImage === index ? 'border-[#2196f3]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${pet.name} ${index + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Details */}
              <div>
                <h1 className="text-3xl font-medium text-gray-900 mb-2">{pet.name}</h1>
                <h2 className="text-2xl font-bold text-[#ff4500] mb-4">{pet.price}</h2>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Available Now
                  </span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <div className="py-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pet Options:</h3>
                    <div className="border border-gray-200 rounded-md p-2 inline-block">
                      <span className="px-4 py-2">{pet.gender}</span>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">Quantity</span>
                      <div className="flex items-center">
                        <button 
                          onClick={decreaseQuantity}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md border border-gray-300"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          value={quantity}
                          readOnly
                          className="w-12 h-8 text-center border-t border-b border-gray-300"
                        />
                        <button 
                          onClick={increaseQuantity}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md border border-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <button className="w-full bg-[#2196f3] text-white py-3 px-4 rounded-md hover:bg-[#1976d2] transition-colors flex items-center justify-center">
                      <span>Book Now</span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pet Details Table */}
            <div className="px-6 pb-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4 border-b pb-2">Pet Details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Type:</span>
                    <span className="text-gray-600">{pet.type}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Breed:</span>
                    <span className="text-gray-600">{pet.breed}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Age:</span>
                    <span className="text-gray-600">{pet.age}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Gender:</span>
                    <span className="text-gray-600">{pet.gender}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Weight:</span>
                    <span className="text-gray-600">{pet.weight}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Color:</span>
                    <span className="text-gray-600">{pet.color}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Location:</span>
                    <span className="text-gray-600">{pet.location}</span>
                  </div>
                  <div className="flex">
                    <span className="min-w-32 font-medium text-gray-700">Vaccinated:</span>
                    <span className="text-gray-600">{pet.vaccinated ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Description:</h4>
                <p className="text-gray-600">{pet.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Sections could be added here (related pets, etc.) */}
    </div>
  );
};

export default PetDetailsPage;