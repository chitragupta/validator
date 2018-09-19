const express = require("express");
const morgan = require('morgan');

MongoClient = require('mongodb').MongoClient;

const config = require('./config.js');
const schemaHandler = require('./src/routes/schemaHandler.js');
const dataHandler = require('./src/routes/dataHandler.js');

url = 'mongodb://localhost:27017';
dbName = 'chitragupt';

MongoClient.connect(url,function(err,client){
  if(err){
    console.log("Not able to connect db");
    process.exit(2);
  }
  console.log("Successfully connected to DB");
  client.close();
});

const app = express();

app.listen(config.port,()=>console.log(`Magic happens at ${config.port}`));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan('dev'));

app.get('/',(req,res)=>res.send("Hello don't worry I am up "));
app.get('/schemas/:name',schemaHandler.getSchema);

app.put('/schemas/:name',schemaHandler.addSchema);
