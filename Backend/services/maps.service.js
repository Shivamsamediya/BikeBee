import axios from "axios";

const OSM_NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSM_ROUTING_URL = "https://router.project-osrm.org/route/v1/driving";

// lat aur long nikalne ka fn.
export const getAddressCoordinates = async (address) => {
  try {
    const response = await axios.get(OSM_NOMINATIM_URL, {
      params: { q: address, format: "json", limit: 1 },
    });

    if (response.data.length === 0) {
      throw new Error("Unable to find coordinates for the given address.");
    }

    const { lat, lon } = response.data[0];
    return { latitude: lat, longitude: lon };
  } catch (error) {
    throw new Error(error.message);
  }
};

// distance aur time nikalne ka fn
export const getDistanceAndTime = async (origin, destination) => {
  try {
    const originCoordinates = await getAddressCoordinates(origin);
    const destinationCoordinates = await getAddressCoordinates(destination);
    
    const { latitude: lat1, longitude: lon1 } = originCoordinates;
    const { latitude: lat2, longitude: lon2 } = destinationCoordinates; 

    const response = await axios.get(`${OSM_ROUTING_URL}/${lon1},${lat1};${lon2},${lat2}`, {
      params: { overview: "false", steps: false },
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("Unable to find a route between locations.");
    }

    const { distance, duration } = response.data.routes[0];
    return {
      distance: `${(distance / 1000).toFixed(2)} kms`,
      duration: `${(duration / (60*60)).toFixed(2)} hours`,  
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAutocompleteSuggestions = async (input) => {
  try {
    const response = await axios.get(OSM_NOMINATIM_URL, {
      params: {
        q: input,
        format: "json",
        limit: 10,
      },
    });

    const suggestions = response.data.map((item) => ({
      display_name: item.display_name,
      latitude: item.lat,
      longitude: item.lon,
    }));

    return suggestions;
  } catch (error) {
    throw new Error(error.message);
  }
};

