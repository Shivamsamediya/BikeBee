// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMessage, faPhone, faTimes, faCheckCircle, faMoneyBill, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CaptainHome() {
  const [isFormActive, setIsFormActive] = useState(false);
  const [isCheckingRides, setIsCheckingRides] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [isGoingToPickup, setIsGoingToPickup] = useState(false);
  const [isRideCompleted, setIsRideCompleted] = useState(false);

  const handleAcceptRide = () => {
    setAcceptedRide({
      customerName: 'Ellyse Perry',
      source: '24C, Near Chai Sutta Bar Cafe, Bhawarkuan, Indore',
      destination: '18B, Near Tealogy Cafe, Geeta Bhawan, Indore',
      price: '₹44',
      distance: '4.4km'
    });

    setIsCheckingRides(false);
    setIsFormActive(true);
  };

  const navigate = useNavigate();

  const handleCompleteRide = () => {
    setIsRideCompleted(true);
    setIsGoingToPickup(false);

    setTimeout(() => {
      navigate("/captain-home");
    }, 1000);
  };

  return (
    <div className={`h-screen relative font-sans bg-gray-100 ${isFormActive ? 'overflow-hidden' : ''}`}>
      {!isFormActive && !isGoingToPickup && (
        <>
          <img
            className="w-16 absolute left-5 top-5 z-10"
            src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
            alt="BikeBee-Logo"
          />
          <img className='w-full object-cover' src="https://www.google.com/maps/d/thumbnail?mid=1nnqAkYKD29G-RqaZLHbvqcOeA4Y" alt="Temporary map image" />

          <div className="p-4 bg-white shadow-md flex flex-col items-center text-center">
            <img
              src="https://i.pinimg.com/originals/46/29/03/4629035e6de4e1be57a9a81025ba742c.jpg"
              alt="Captain"
              className="w-20 h-20 rounded-full mb-3"
            />
            <h2 className="text-lg font-bold">Santosh Kumar</h2>
            <div className="flex justify-center gap-2 mt-2 text-gray-700">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <p>12 Rides</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMoneyBill} className="text-yellow-500" />
                <p>₹750 Earned</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTachometerAlt} className="text-blue-500" />
                <p>Avg Speed: 40 km/h</p>
              </div>
            </div>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              onClick={() => setIsCheckingRides(true)}
            >
              Check Rides
            </button>
          </div>
        </>
      )}

      {isCheckingRides && !acceptedRide && (
        <div className="absolute bottom-0 w-full p-4 bg-white shadow-lg rounded-t-xl">
          <h4 className="text-xl text-center font-semibold mb-4 text-gray-900">Ride Request</h4>
          <div className="flex justify-center items-center gap-2 mb-4 p-4 border border-gray-300 rounded-xl">
            <img
              src="https://external-preview.redd.it/JKUmznPLHwVuswseaMmjqJ6C8cTZkOzZChsZvGQ4iW8.jpg?auto=webp&s=8e66cf91c03f5ec8d744b577cf36a87c5b22d0a1"
              alt="User"
              className="w-16 h-16 rounded-md shadow-md"
            />
            <p className="text-md font-bold text-gray-900">Ellyse Perry</p>
            <p className='text-gray-600'>Users Description</p>
          </div>
          <div className="text-gray-800 font-semibold text-sm">
            <div className='flex justify-start mb-2'>
              <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
              <p><strong>Source: </strong>24C, Near Chai Sutta Bar Cafe, Bhawarkuan, Indore</p>
            </div>
            <div className='flex justify-start mt-2 border-t pt-2'>
              <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
              <p><strong>Destination: </strong>18B, Near Tealogy Cafe, Geeta Bhawan, Indore</p>
            </div>
            <div className='flex justify-between mt-2 border-t pt-2'>
              <p><strong>Price: </strong>₹44</p>
              <p><strong>Distance: </strong>4.4km</p>
            </div>
            <div className='flex justify-between mt-4'>
              <button className='p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600' onClick={handleAcceptRide}>Accept</button>
              <button className='p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600' onClick={() => setIsCheckingRides(false)}>Ignore</button>
            </div>
          </div>
        </div>
      )}

      {acceptedRide && (
        <>
          <div className="absolute top-4 w-full p-4 bg-white shadow-lg rounded-t-xl">
            <h4 className="text-xl text-center font-semibold mb-4 text-gray-900">Ride Details</h4>
            <div className="text-gray-800 font-semibold text-sm">
              <div className='flex justify-start mb-2'>
                <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
                <p><strong>Source: </strong>{acceptedRide.source}</p>
              </div>
              <div className='flex justify-start mt-2 border-t pt-2'>
                <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
                <p><strong>Destination: </strong>{acceptedRide.destination}</p>
              </div>
              <div className='flex justify-between mt-2 border-t pt-2'>
                <p><strong>Price: </strong>{acceptedRide.price}</p>
                <p><strong>Distance: </strong>{acceptedRide.distance}</p>
              </div>
              <div className='flex justify-between mt-4'>
                <button className='p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600'>
                  <FontAwesomeIcon icon={faPhone} /> Call
                </button>
                <button className='p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600'>
                  <FontAwesomeIcon icon={faMessage} /> Message
                </button>
                <button className='p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600' 
                  onClick={() => {
                    setAcceptedRide(null);
                    setIsCheckingRides(true);
                    setIsFormActive(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
              </div>
              <div className='flex items-center justify-center mt-6'>
                <button className='p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600' onClick={()=>{
                  setAcceptedRide(null);
                  setIsFormActive(false);
                  setIsGoingToPickup(true);
                  setIsRideCompleted(false);
                }}>
                  Go to PickUp
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {!isFormActive && isGoingToPickup && !isRideCompleted && (
        <>
          <img
            className="w-16 absolute left-5 top-5 z-10 drop-shadow-lg"
            src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
            alt="BikeBee-Logo"
          />
          <img
            className="w-full h-3/4 object-cover rounded-lg shadow-md"
            src="https://www.google.com/maps/d/thumbnail?mid=1nnqAkYKD29G-RqaZLHbvqcOeA4Y"
            alt="Temporary map image"
          />

          <div className="mb-1 bg-white shadow-lg rounded-lg flex flex-col items-center text-center p-4">
            <h2 className="text-lg font-bold text-gray-800">Santosh Kumar</h2>

            <div className="mt-2 px-4 py-1 bg-gray-100 rounded-md shadow-sm">
              <span className="text-gray-700 font-medium">Rate your Customer: <span className="text-yellow-500 font-bold">4.5⭐</span></span>
            </div>

            <button
              className="mt-4 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
              onClick={handleCompleteRide}
            >
              Complete Ride
            </button>
          </div>
        </>
      )}
      
    </div>
  );
}

export default CaptainHome;
