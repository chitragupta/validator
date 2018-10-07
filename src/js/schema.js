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

const replace$ = function(schema) {
  return JSON.parse(JSON.stringify(schema).replace("$schema","GivENschema"));
}

const replaceTo$ = function(schema) {
  return JSON.parse(JSON.stringify(schema).replace("GivENschema","$schema"));
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
      writeToDB(schemas,schemaName,replace$(schema),client);
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
        res.json(replaceTo$(result));
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
