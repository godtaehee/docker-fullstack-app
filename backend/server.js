const express = require('express');

const app = express();

app.use(express.json());

db.pool.query(`CREATE TABLE lists (
id INTEGER AUTO_INCREMENT,
value TEXT,
PRIMARY KEY (id)
)`, (err, results, fields) => {
  console.log('result', results);
});

app.get('/api/values', function (req, res) {
  db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
    if (err)
      return res.status(500).send(err);
    else
      return res.json(results)
  })
});

app.post('/api/value', function (req, res, next) {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`, (err, results, fields) => {
    if (err)
      return res.status(500).send(err)
    else
      return res.json({success: true, value: req.body.value})
  });
})


app.listen(5000, () => {
  console.log('http://localhost:5000');
})
