class Product {
	constructor(name, price, description, image, category, owner) {
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
		this.category = category;
		this.owner = owner;
	}
}
module.exports = {
	Product,
};
