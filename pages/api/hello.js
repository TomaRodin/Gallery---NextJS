const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const basicAuth = require("express-basic-auth");
const date = require('date-and-time');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())

app.get('/', basicAuth({ users: { 'admin': 'admin123' } }), function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.all('SELECT * FROM Gallery', function (err, rows) {
      console.log(rows)
      res.json(rows);
    });

  })
})

app.post('/add', basicAuth({ users: { 'admin': 'admin123' } }), upload.single('file'), function (req, res) {
  const oldName = path.parse(req.file.originalname).name + path.parse(req.file.originalname).ext
  const name = uuidv4() + path.parse(req.file.originalname).ext
  const now = new Date();
  console.log(now)
  const dateNow = date.format(now, 'ddd, MMM DD YYYY HH:mm');

  fs.rename(__dirname + `/Images/${oldName}`, __dirname + `/Images/${name}`, function (err) {
    if (err) console.log('ERROR: ' + err);
  });
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    const Link = `${name}`
    db.run(`INSERT INTO Gallery (Title,Link,Date) VALUES ('${req.body.name}','${Link}','${dateNow}')`);

  })

})


app.delete('/', basicAuth({ users: { 'admin': 'admin123' } }), function (req, res) {
  const sqlite3 = require('sqlite3').verbose();

  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.all(`SELECT * FROM Gallery WHERE id ='${req.query.id}'`, function (err, rows) {
      const fileAddress = rows[0]
      fs.unlink(`Images/${fileAddress.Link}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    })
    db.run(`DELETE FROM Gallery WHERE id ='${req.query.id}'`);
  })

  res.json({ success: true })

})

app.get('/image/:id', function (req, res) {
  res.sendFile(__dirname + "/Images/" + req.params.id)
})


app.put('/', basicAuth({ users: { 'admin': 'admin123' } }), function (req, res) {
  const data = req.body
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    db.all(`UPDATE Gallery SET Title ='${data.NewTitle}' WHERE id =${data.id}`)
  })
  res.json({ success: true })

})

app.listen(3001);