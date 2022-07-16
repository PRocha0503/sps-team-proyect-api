const { response } = require("express");
const {
	addEntity,
	getEntity,
	updateEntity,
	getWithFilter,
	deleteEntity,
	getAllEntries,
	deleteAllEntities,
  getEntitiesGrouped,
} = require("../database/config");

const healthy = (req, res) => {
	res.status(200).json({
		msg: `Healthy`,
	});
};

const getProductsGrouped = async (req, res = response) => {
  try {

    const groupedOrdersByProduct = await getEntitiesGrouped("Order", ["product"]);

    res.status(200).json({
      groupedOrdersByProduct,
    });
  }
  catch (err) {
    res.status(500).json({
      msg: `Error: ${err}`,
    });
  }
}

const getMappedOrder = async (req, res = response) => {
	try {
    const {business} = req.params;

		const orders = await getAllEntries("Order");
    
		const final = [];
		for (const order of orders) {
			const product = await getEntity("Product", order.product.name);
      
      const user = await getWithFilter("User", "username", order.user.name);

      if (user !== undefined && user[0] !== undefined && user[0].type === 'customer') {
        const customer = await getEntity("Customer", "c" + user[0].username);

        if (customer !== undefined && customer !== null) {
          order.user.gender = customer.gender;
          order.user.age = customer.age;
        }
      }
      else {
        order.user.gener = 'other';
      }
			const sample = {
				...order,
				product: {
					...product,
				},
			};

      if(sample.product.owner===business) { 
			  final.push(sample);
      }
		}
		res.status(201).json({
			...final,
		});
	} catch (err) {
		res.status(401).json({
			msg: `Error getting orders ${err}`,
		});
	}
};


module.exports = {
	healthy,
  getMappedOrder,
  getProductsGrouped,
};
