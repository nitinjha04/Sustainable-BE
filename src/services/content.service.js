const { Content } = require("../models/Content.modal");
const BasicServices = require("./basic.service");

class ContentService extends BasicServices {
  constructor() {
    super(Content);
  }

}

module.exports.ContentService = new ContentService();
