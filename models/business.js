/**
 * @class Business
 * @description Defines the Business model for the API
 * @author Juan Manuel Garcia Briones
 * @version 1.0
 */
class Business {
  /**
   * @constructor
   * @param {String} username 
   * @param {String} name
   * @param {String} password 
   * @param {String} businessType
   * @param {String} phone 
   */
	constructor(username, name, password, businessType, phone) {
		this.username = username;
		this.password = password;
		this.businessType = businessType;
    this.phone = phone;
    this.name = name;

    this.address = "";
    this.location = {};
    this.serviceHours = {};
    this.is_deleted = false;
	}

  /**
   * @function checkSanity
   * @description Checks if the business is valid with the class attributes
   * @returns {Boolean}
   * @author Juan Manuel Garcia Briones
   * @version 1.0
   * @throws {Error}
   * @memberof Business
  */
  checkSanity() {
    let usernameRegex = /^[a-zA-Z]+.*$/;
    let nameRegex = /^([a-zA-Z]+(\s)*)+[0-9]*$/;
    let phoneRegex = [
      /^[0-9]{10}$/,
      /^[0-9]{3}-[0-9]{7}$/
    ];


    if (!(this.username && this.password && this.businessType && this.phone && this.name)) {
      throw new Error("Business is not valid");
    }
    if (this.username.length < 3 || this.username.length > 20) {
      throw new Error("Username must be between 3 and 20 characters");
    }
    if (!usernameRegex.test(this.username)) {
      throw new Error("Username must start with a letter");
    }
    if (!nameRegex.test(this.name)) {
      throw new Error("Name must be valid");
    }
    if (!phoneRegex[0].test(this.phone) || phoneRegex[1].test(this.phone)) {
      throw new Error("Phone must be valid");
    }

    return true;
  }
}

module.exports = {
	Business,
};
