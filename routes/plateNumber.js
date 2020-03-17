const { extractData } = require("../modules/plateNumber/index");
const { handle } = require("../modules/plateNumberDetection/index");
const { initForm } = require("../utils/formData");
const { getNameFromPath } = require("../utils/file");
const { response } = require("../models/response");

const extractPlateNumber = async (req, res, next) => {
  const form = initForm("images/storage/plateNumber");
  form.parse(req, async (error, fields, file) => {
    const f = file[""];

    const image = {
      path: f.path,
      name: getNameFromPath(f.path)
    };

    try {
      const result = await handle(image);
      res.send(response({ plate: result }));
    } catch (ex) {
      res.send(response("", ex, true));
    }
  });
};

module.exports = {
  extractPlateNumber
};
