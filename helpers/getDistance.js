const {Client} = require("@googlemaps/google-maps-services-js");

const getTravelInformation = async (businessLocation, userLocation) => {
    const businessLat = businessLocation.lat;
    const businessLng = businessLocation.lng;
    const userLat = userLocation.lat;
    const userLng = userLocation.lng;

    const service = new Client({});

    const origin = {
      lat: userLat,
      lng: userLng,
    }
    const destination = {
      lat: businessLat,
      lng: businessLng,
    }

    return await service.distancematrix({
      params: {
          key: process.env.MAPS_API_KEY,
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: 'METRIC',
          avoidHighways: false,
          avoidTolls: false
        }
      }
    ).then(response => {
      console.log(response.data.rows[0].elements[0].distance);
      return response.data.rows[0].elements[0].distance; // { text: '164 km', value: 164060 }
    }
    ).catch(err => {
      console.log(err);
    });
  }

module.exports = {
  getTravelInformation,
}
