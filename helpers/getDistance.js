const {Client} = require("@googlemaps/google-maps-services-js");

class GeoCoder {
  constructor(businessLocation, userLocation) {
    this.businessLat = businessLocation.lat;
    this.businessLng = businessLocation.lng;
    this.userLat = userLocation.lat;
    this.userLng = userLocation.lng;

    this.service = new Client({});

    this.origin = {
      lat: this.userLat,
      lng: this.userLng,
    }
    this.destination = {
      lat: this.businessLat,
      lng: this.businessLng,
    }

  }

  async getTravelInformation() {
    return await this.service.distancematrix({
      params: {
          key: process.env.MAPS_API_KEY,
          origins: [this.origin],
          destinations: [this.destination],
          travelMode: 'DRIVING',
          unitSystem: 'METRIC',
          avoidHighways: false,
          avoidTolls: false
        }
      }
    ).then(response => {
      return response.data.rows[0].elements[0].distance.value; // { text: '164 km', value: 164060 }
    }
    ).catch(err => {
      console.log(err);
    });
  }
  
  async getDistance() {
    return await this.getTravelInformation()
      .then(response => {
        return response;
      }
      ).catch(err => {
        console.log(err);
      }
    );
  }

}

module.exports = {
  GeoCoder,
}
