const dataController = require("../js/data.js");

const validate = function(req,res){
  let data = req.body;
  let {name} = req.params;
  dataController.validate(name,data)(req,res);
}

module.exports = {
  handle:validate
}
