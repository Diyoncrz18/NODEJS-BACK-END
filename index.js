const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection.js");
const response = require("./response.js");
const { error } = require("console");

// Routes / URL / endpoint utama kita method GET
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM tb_mahasiswa";
  db.query(sql, (error, result) => {
    // Hasil data dari mysql
    response(200, result, "get all data from mahasiswa", res);
  });
});

app.get("/name", (req, res) => {
  console.log({ urlParam: req.query });
  res.send("My name is DION KOBI");
});

app.get("/find", (req, res) => {
  const sql = `SELECT namaLengkap FROM tb_mahasiswa WHERE nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
   response(200, result, "find mahasiswa name", res) 
  })
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body.username });
  res.send("Login berhasil");
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  res.send("Update berhasi!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
