const express = require('express');
const app = express();
const path = require('path');
const bucketListRouter = require('./routers/bucket_list');
const MongoClient = require('mongodb').MongoClient;
const parser = require('body-parser')

app.use(express.static(path.join(__dirname, '../client/public')));

app.use(parser.json());


const db = MongoClient.connect('mongodb://localhost:27017', function(err, client){
  const db = client.db('bucket_list')
  const bucketListCollection = db.collection('countries')
  app.use('/api/bucket_list_countries', bucketListRouter(bucketListCollection));
})

app.listen(3000, function(){
  console.log('I hear ya');
  
})