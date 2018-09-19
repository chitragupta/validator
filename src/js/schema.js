const fs = require('fs');
const path = require('path');

const writeToDB = function(schemas,schemaName,schema,client){
  schemas.insertOne({name:schemaName,value:schema},function (err,success) {
    if(err){
      console.log(err);
      console.log("Updating failed");
    }
    if(success) {
      console.log("Success to add schema");
    }
    client.close();
    return;
  })
}

const validate = function(schemaName,schema){
  MongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      return;
    }
    let schemas = client.db(dbName).collection('schemas');
    schemas.findOne({name:schemaName},function(err,result){
      if(err || result){
        return;
      }
      writeToDB(schemas,schemaName,schema,client);
    })
  })
}

const getSchema = function(schemaName) {
 return function(req,res){
    MongoClient.connect(url,function(err,client){
      if(err){
        console.log(err);
        return;
      }
      let schemas = client.db(dbName).collection('schemas');
      schemas.findOne({name:schemaName},function(err,result){
        if(err){
          return;
        }
        res.json(result);
      })
      client.close();
    })
    return;
  };
}

module.exports = {
  addSchema:validate,
  getSchema:getSchema
};
