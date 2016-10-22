require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db;

app.get('/api/foo', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  } else {
    res.json({foo: 'bar'})
  }
});

MongoClient.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:63536/react-quick-api`, (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
});



