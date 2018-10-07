const dataController = require("../js/data.js");

const validate = function(req,res){
  let {data} = req.body;
  
  let name = data.schema;
  dataController.validate(name,data)(req,res);
}

module.exports = {
  handle:validate
}
