const schemaController = require('../js/schema.js');

const getSchema = function(req,res) {
  res.json(schemaController.getSchema(req.params.name));
}

const addSchema = function(req,res) {
  let {name} = req.params;
  let {schema} = req.body;
  try {
    schemaController.addSchema(name,schema);
  } catch (e) {
    res.status(409).send(e);
  }
  res.send();
}

module.exports = {
  getSchema:getSchema,
  addSchema:addSchema
}
