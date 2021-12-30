const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb (null, 'Images')
  },
  filename: (req,file,cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({storage:storage})


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

app.post('/add',upload.single('file') , function (req, res) {
  const name = path.parse(req.file.originalname).name
  const parts = req.file.originalname.split('.')
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    const Link = `${name}.${parts[1]}`
    db.run(`INSERT INTO Gallery (Title,Link) VALUES ('${req.body.name}','${Link}')`);

  })

})


app.delete('/', function (req, res) {
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
    res.sendFile(__dirname+"/Images/"+req.params.id)
})


app.listen(3001);