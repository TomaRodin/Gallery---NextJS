const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.all('SELECT * FROM Gallery', function (err, rows) {
      console.log(rows)
      res.json(rows);
    });

  })
})

app.post('/add', function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.run(`INSERT INTO Gallery (Title,Link) VALUES ('${req.body.Title}','${req.body.Link}')`);

  })

})


app.delete('/', function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.run(`DELETE FROM Gallery WHERE id ='${req.query.id}'`);
  })

  res.json({success:true})

})


app.listen(3001);