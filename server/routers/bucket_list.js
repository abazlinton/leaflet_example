const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const bucketListRouter = function (bucketListCollection) {

  router.get('/', (req, res) => {
    bucketListCollection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) => {
    const newCountry = req.body;
    bucketListCollection
      .insertOne(newCountry)
      .then(() => {
        bucketListCollection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    bucketListCollection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => {
        bucketListCollection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;

};

module.exports = bucketListRouter;