const Ajv = require("ajv");
const request = require('request');
const path = require('path');
const config = require(path.resolve("./config.js"));
const schemaController = require('./schema.js');

const ajv = Ajv();

const save = function(schemaName,data){
  MongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      return;
    }
    let dataCollection = client.db(dbName).collection('data');
    dataCollection.insert({name:schemaName,value:data},function (err,success) {
      if(err){
        console.log("Updating failed");
      }
      if(success) {
        console.log("Success to add data");
      }
      return;
    })
    client.close();
  })
}

const validator = function(schemaName,data){
  return function(req,res){
    let url = config.schema.server;
    request(url+ `/schemas/${schemaName}`,function(err,response,body){
      if (err) {
        console.log(err);
        return;
      }
      schema = JSON.parse(body);
      if(!schema){
        res.send(`Schema name, ${schemaName} doesn't exists`);
        return;
      }
      if(!ajv.validate(schema.value,data)){
        res.send(`Invalid data`);
        return;
      }
      save(schemaName,data);
      res.send();
    })
    return;
  }
}

module.exports = {
  validate: validator,
  save:save
}
