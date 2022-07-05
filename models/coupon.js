class Coupon {
	constructor(code, item, percentage, owner) {
		this.code = code;
		this.item = item;
		this.percentage = percentage;
		this.owner = owner;
	}
}
module.exports = {
	Coupon,
};
