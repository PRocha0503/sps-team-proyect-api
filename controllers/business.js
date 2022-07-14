const { response } = require("express");
const { Business } = require("../models/business");
const {
	addEntity,
	getEntity,
	updateEntity,
	getWithFilter,
	deleteEntity,
	getAllEntries,
	deleteAllEntities,
} = require("../database/config");
const {
	GeoCoder,
} = require('../helpers/getDistance');
//} = require("@google/maps");

const healthy = (req, res) => {
	res.status(200).json({
		msg: `Healthy`,
	});
};

const registerBusiness = async (req, res) => {
	try {
		const {
      name,
      username,
      businessType,
			serviceArea,
			servicesHours,
			location,
      phone
    } = req.body;

    const business = new Business(
      username,
      name,
      businessType,
      phone,
			location,
			servicesHours,
			serviceArea,
		);
    
    if (!await business.checkSanity()) {
      throw new Error("Business is not valid");
    }
		await addEntity("Business", business.username, business);
		
    res.status(201).json({
			msg: `Business ${business.name} added successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error adding business ${err}`,
		});
	}
};

const getBusiness = async (req, res = response) => {
	try {
		const {name} = req.params;
		const business = await getEntity("Business", name);
		res.status(201).json({
			...business,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting business ${err}`,
		});
	}
};

const getAllBusiness = async (req, res) => {
	try {
		const business = await getWithFilter("Business", "is_deleted", false);
		res.status(201).json({
			...business,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting businesses ${err}`,
		});
	}
};

const deleteBusiness = async (req, res = response) => {
	// TODO: Add authentication
  try {
		const {name} = req.params;

		await deleteEntity("Business", name);
		/*await updateEntity("Business", name, {
      is_deleted: true,
    });*/

		res.status(201).json({
			msg: `Product deleted successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error deleting product ${err}`,
		});
	}
};

const updateBusiness = async (req, res = response) => {
	try {
		const { name } = req.params;
		const changes = req.body;
		await updateEntity("Business", name, changes);
		res.status(201).json({
			msg: `Business updated successfully`,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error updating business ${err}`,
		});
	}
};

const getNearestBusiness = async (req, res) => {
	try {
		//const { lat, lng, serviceArea } = req.body;
		//const business = await getAllEntries("Business");

		/*const nearestBusiness = business.reduce((acc, curr) => {
			const distance = 
			if (distance < acc.distance) {
				acc.distance = distance;
				acc.business = curr;
			}
			return acc;
		}, { distance: Infinity, business: {} });*/

		const geocoder = new GeoCoder( { lat: 55.93, lng: -3.118 }, { lat: 55.087, lng: -4.421 })

		console.log(await geocoder.getDistance());

		res.status(200).json({
			msg: 'Business found successfully',
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting business ${err}`,
		});
	}
}

module.exports = {
	healthy,
  getAllBusiness,
  registerBusiness,
  deleteBusiness,
  getBusiness,
  updateBusiness,
	getNearestBusiness,
};
