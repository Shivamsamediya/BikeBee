// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext.jsx';
import { UserDataContext } from '../context/UserContext';

function UserHome() {
  const [isFormActive, setIsFormActive] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [faresVisible, setFaresVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rideConfirmPanel, setRideConfirmPanel] = useState(false);
  const [rideConfirmed, setrideConfirmed] = useState(false);
  const [fares, setFares] = useState({ auto: 0, car: 0, moto: 0 });

  const { socket } = useContext(SocketContext);

  const { user } = useContext(UserDataContext);

  //console.log(user);

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user, socket]);

  const formRef = useRef(null);

  const handleFocus = () => {
    setIsFormActive(true);
  };

  const handleBlur = (e) => {
    if (formRef.current && !formRef.current.contains(e.relatedTarget)) {
      setIsFormActive(false);
    }
  };

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        setFares(response.data);
        setFaresVisible(true);
      }
    } catch (error) {
      console.error('Error fetching fares:', error);
    }
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRideConfirmPanel(true);
    setIsFormActive(false);
  };

  const createRide = async (vehicleType) => {
    if (!pickup || !destination || !vehicleType) {
      console.error('All fields are required to create a ride.');
      return;
    }
  
    try {
      console.log('Creating ride with:', { pickup, destination, vehicleType });
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Ride created successfully:', response.data);
      } else {
        console.error('Failed to create ride:', response.data);
      }
    } catch (error) {
      console.error('Error creating ride:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`h-screen relative font-sans bg-gray-100 ${isFormActive ? 'overflow-hidden' : ''}`}>
      {!isFormActive && (
        <img
          className="w-16 absolute left-5 top-5 z-10"
          src="https://cdn.iconscout.com/icon/free/png-512/free-online-cab-booking-icon-download-in-svg-png-gif-file-formats--apps-application-driver-public-transportation-pack-vehicle-icons-1380415.png?f=webp&w=256"
          alt="BikeBee-Logo"
        />
      )}

      <div className={`h-full w-full flex items-center justify-center ${isFormActive ? 'absolute top-0 left-0 bg-gray-300 z-0' : 'bg-gray-300 text-gray-700 text-xl font-semibold'}`}>
        {!isFormActive && (
          <img className="h-full w-full object-cover" src="https://www.google.com/maps/d/thumbnail?mid=1nnqAkYKD29G-RqaZLHbvqcOeA4Y" alt="Temporary map image" />
        )}
      </div>

      <div
        ref={formRef}
        className={`absolute bottom-0 w-full p-4 bg-white shadow-lg rounded-t-xl transition-all duration-300 ${isFormActive ? 'h-screen' : 'h-auto'}`}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <h4 className="text-xl font-semibold font-serif mb-4 text-gray-900">Find a trip</h4>
        <form onSubmit={handleSubmit} className="space-y-3 relative">
          <div className="absolute left-4 top-3 h-14 border-l-2 border-gray-500"></div>
          <div className="relative flex items-center" onFocus={handleFocus}>
            <div className="w-3 h-3 bg-black rounded-full absolute left-1"></div>
            <input
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={handlePickupChange}
              className="w-full p-2 bg-stone-200 font-mono border rounded-lg outline-none text-md font-bold focus:ring-2 focus:ring-gray-700 pl-8"
              onFocus={handleFocus}
            />
          </div>
          <div className="relative flex items-center" onFocus={handleFocus}>
            <div className="w-3 h-3 bg-black rounded-md absolute left-1"></div>
            <input
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={handleDestinationChange}
              className="w-full p-2 bg-stone-200 font-mono border rounded-lg outline-none text-md font-bold focus:ring-2 focus:ring-gray-700 pl-8"
              onFocus={handleFocus}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center w-2/5 p-2 bg-black text-white rounded-lg text-md font-bold shadow-md hover:bg-gray-500 transition-all duration-300"
            >
              Find Trips
            </button>
          </div>
        </form>

        {faresVisible && !selectedVehicle && (
          <div className="mt-6 p-4 bg-white border border-gray-500 rounded-lg">
            <h4 className="text-lg font-semibold">Estimated Fares</h4>
            <div className="flex flex-col mt-4 gap-4">
              {[
                { type: 'Moto', fare: fares.moto, image: "https://tse1.mm.bing.net/th?id=OIP.W4ytUNrc8YIoJQjGFof-8gHaHa&pid=Api&P=0&h=180" },
                { type: 'Car', fare: fares.car, image: "https://tse4.mm.bing.net/th?id=OIP.nayM1ShIbQUSFtjGY_4SDwHaCu&pid=Api&P=0&h=180" },
                { type: 'Auto', fare: fares.auto, image: "https://cdn.pixabay.com/photo/2018/07/07/08/23/graphic-3521745_1280.png" },
              ].map((vehicle) => (
                <div
                  key={vehicle.type}
                  className={`flex items-center justify-between gap-1 p-2 border rounded-lg cursor-pointer ${selectedVehicle === vehicle.type ? 'border-black' : 'border-transparent'}`}
                  onClick={() => handleVehicleClick(vehicle.type)}
                >
                  <img src={vehicle.image} alt={vehicle.type} className="w-16 h-12" />
                  <div>
                    <p className="font-semibold text-md font-sans">{vehicle.type}</p>
                    <p className="font-semibold text-sm font-sans text-gray-400">Affordable {vehicle.type} rides</p>
                  </div>
                  <p className="font-semibold text-md font-sans">₹{vehicle.fare.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {!isFormActive && rideConfirmPanel && (
        <div className="h-full w-full flex flex-col items-center bg-gray-200">
          <div className="absolute bottom-0 w-full p-4 bg-white shadow-lg rounded-xl">
            <h4 className="text-xl font-semibold mb-4 text-center">Looking for Nearby Drivers...</h4>
            {[
              { type: 'Moto', fare: fares.moto },
              { type: 'Car', fare: fares.car },
              { type: 'Auto', fare: fares.auto }
            ].map((vehicle) => (
              <div
                key={vehicle.type}
                className={`flex items-center justify-between gap-1 p-2 border rounded-lg cursor-pointer ${
                  selectedVehicle === vehicle.type ? 'border-black' : 'border-transparent'
                }`}
              >
                {selectedVehicle === vehicle.type && (
                  <div className="text-gray-800 font-semibold text-sm">
                    <div className="flex justify-start">
                      <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
                      <p>
                        <strong>Source:</strong> {pickup}
                      </p>
                    </div>
                    <div className="flex justify-start mt-2 border-t pt-2">
                      <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
                      <p>
                        <strong>Destination:</strong> {destination}
                      </p>
                    </div>
                    <div className="flex justify-start gap-3 mt-2 border-t pt-2">
                      <span className="font-bold">=</span>
                      <p>
                        <strong>Price:</strong> ₹{vehicle.fare.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center mt-3">
              <button
                type="button"
                className="flex justify-center items-center w-2/5 p-2 bg-green-500 text-white rounded-lg text-md font-bold shadow-md hover:bg-gray-500 transition-all duration-300"
                onClick={() => {
                  createRide(selectedVehicle.toLowerCase()); 
                  setrideConfirmed(true);
                  setRideConfirmPanel(false);
                }}
              >
                Confirm Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {!isFormActive && rideConfirmed && !rideConfirmPanel && (
        <div className="absolute bottom-0 left-0 right-0 w-full p-6 bg-white shadow-xl rounded-t-3xl">
          <h4 className="text-xl font-bold text-center text-gray-900">
            <FontAwesomeIcon icon={faLocationDot} className="text-lg mr-2" />
            Meet at the Pickup Point
          </h4>
          <div className="mt-2 text-center">
            <p className="text-md font-bold text-gray-800">{pickup}</p>
          </div>
          <div className="flex items-center gap-4 mt-6 p-4 border border-gray-300 rounded-xl">
            <img
              src="https://i.pinimg.com/originals/46/29/03/4629035e6de4e1be57a9a81025ba742c.jpg"
              alt="Driver"
              className="w-16 h-16 rounded-full shadow-md"
            />
            <div>
              <h5 className="text-lg font-bold text-gray-900">Santosh Kumar</h5>
              <p className="text-md font-semibold text-gray-800">{selectedVehicle}</p>
              <p className="text-black font-semibold flex items-center">
                ⭐ 4.9 <span className="text-gray-400 text-sm ml-1">(500+ ratings)</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="text-gray-900 text-sm font-semibold border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
              Safety
            </button>
            <button className="text-gray-900 text-sm font-semibold border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
              Share My Trip
            </button>
            <button className="text-gray-900 text-sm font-semibold border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
              Call Driver
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="button"
              className="flex justify-center items-center w-1/2 p-2 bg-green-500 text-white rounded-lg text-md font-bold shadow-md hover:bg-gray-500 transition-all duration-300"
            >
              Make a Payment
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default UserHome;
