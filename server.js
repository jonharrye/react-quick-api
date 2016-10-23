if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const assign = require('lodash.assign');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const JSONS = require('json-serialize');
const shortid = require('shortid');
const app = express();
const dburl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
let db;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => res.render('home'));

app.get('/jso', (req, res) => {
  const id = req.query.n;
  if (!id) return res.render('404.pug');
  db.collection('objects').findOne({object_id: id}, (err, result) => {
    if (err) return res.json({error: err});
    res.json(JSONS.deserialize(result.object));
  })
});

app.post('/api/objects', (req, res) => {
  try {
    JSON.parse(req.body.object);
  } catch (err) {
    // if json is invalid, short circuit request
    return res.json({error: 'invalid json'})
  }
  const uuid = shortid.generate() + '✓';
  const obj = assign(req.body, {
    object_id: uuid,
    object: JSONS.serialize(req.body.object)
  });
  db.collection('objects').save(obj, (err, result) => {
    if (err) {
      console.log('err saving', err);
      return res.json({error: err})
    }
    res.json(result.ops[0]);
  })
});

// if user tries to visit malformatted url
app.get('*', (req, res) => res.render('404.pug'));

MongoClient.connect(`${dburl}:63536/react-quick-api`, (err, database) => {
  if (err) return console.log(err);
  db = database;
  /**
   * Start Express server.
   */
  app.listen(app.get('port'), () => {
    console.log('%s Express server listening on port %d in %s mode.', '✓', app.get('port'), app.get('env'));
  });
});
