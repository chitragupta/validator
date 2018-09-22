const schemaController = require('../js/schema.js');

const getSchema = function(req,res) {
  schemaController.getSchema(req.params.name)(req,res);
}

const addSchema = function(req,res) {
  let {name} = req.params;
  let schema = req.body;
  try {
    schemaController.addSchema(name,schema);
  } catch (e) {
    console.log(e);
    res.status(409).send(e);
  }
  res.send();
}

module.exports = {
  getSchema:getSchema,
  addSchema:addSchema
}
