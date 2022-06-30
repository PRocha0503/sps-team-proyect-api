class Order {
	constructor(user, product, date, price, delivered) {
		this.user = user;
		this.product = product;
		this.date = date;
		this.price = price;
		this.delivered = delivered;
	}
}

module.exports = {
	Order,
};
