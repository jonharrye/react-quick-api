if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const assign = require('lodash.assign');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const JSONS = require('json-serialize');
const dburl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
console.log('dburl ', dburl);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db;

app.get('/api/objects', (req, res) => {
  const id = req.query.object_id;
  db.collection('objects').findOne({object_id: id}, (err, result) => {
    if (err) {
      console.log('findOne error', err);
      return res.json({
        error: err
      })
    }
    res.json(JSONS.deserialize(result.object));
  })
});

app.post('/api/objects', (req, res) => {
  const body = req.body;
  try {
    JSON.parse(body.object);
    console.log('valid');
  } catch (err) {
    console.log('err invalid json', err);
    return res.json({error: 'invalid json'})
  }
  const obj = assign(body, {
    object_id: uuid.v4(),
    object: JSONS.serialize(body.object)
  });
  db.collection('objects').save(obj, (err, result) => {
    if (err) return console.log(err);
    res.json(result.ops[0]);
  })
});

MongoClient.connect(`${dburl}:63536/react-quick-api`, (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
});



