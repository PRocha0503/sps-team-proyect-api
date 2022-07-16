const { Client } = require("@googlemaps/google-maps-services-js");

const getTravelInformation = async (businessLocation, userLocation) => {
	const { lat: businessLat, lng: businessLng } = businessLocation;
	const { lat: userLat, lng: userLng } = userLocation;

	console.log("BUSINESS");
	console.log(businessLocation);
	console.log(userLocation);

	const service = new Client({});

	const origin = {
		lat: userLat,
		lng: userLng,
	};
	const destination = {
		lat: businessLat,
		lng: businessLng,
	};

	try {
		console.log("ATTEMPT");
		const res = await service.distancematrix({
			params: {
				key: process.env.MAPS_API_KEY,
				origins: [origin],
				destinations: [destination],
				travelMode: "DRIVING",
				unitSystem: "METRIC",
				avoidHighways: false,
				avoidTolls: false,
			},
		});

		console.log(res.data.rows[0].elements);
		if (!res.data.rows[0].elements[0].distance) {
			return {
				distance: "NOT POSSIBLE",
				value: 10000000000000000000000000000000000000000000000000000000000000000000,
			};
		}
		return res.data.rows[0].elements[0].distance;
	} catch (err) {
		console.log(err);
	}
};

// const getTravelInformation = async (businessLocation, userLocation) => {
// 	const { lat: businessLat, lng: businessLng } = businessLocation;
// 	const { lat: userLat, lng: userLng } = userLocation;
// 	console.log(userLng);

// 	console.log("BUSINESS");
// 	console.log(businessLocation);
// 	console.log(userLocation);
// 	console.log();
// 	console.log(Math.pow(userLng - businessLng, 2));
// 	distance = Math.sqrt(
// 		Math.pow(userLng - businessLng, 2) + Math.pow(userLat - businessLat, 2)
// 	);
// 	console.log(distance);
// };
module.exports = {
	getTravelInformation,
};
