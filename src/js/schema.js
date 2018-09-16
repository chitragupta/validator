const fs = require('fs');
const path = require('path');

const writeToDB = function(schemas,schemaName,schema){
  schemas.insert({name:schemaName,value:schema},function (err,success) {
    if(err){
      console.log("updating failed");
    }
    if(success) {
      console.log("success to add schema");
    }
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
    schemas.find({name:schemaName},function(err,result){
      if(err || result.length>0){
        return;
      }
      writeToDB(schemas,schemaName,schema);
    })
    client.close();
  })
}

const getSchema = function(schemaName) {
  let schema;
  MongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      return;
    }
    let schemas = client.db(dbName).collection('schemas');
    schema = schemas.find({name:schemaName},function(err,result){
      if(err){
        return;
      }
      console.log(result);
      return result[0];
    })
    client.close();
  })
  return schema;
}

module.exports = {
  addSchema:validate,
  getSchema:getSchema
};
