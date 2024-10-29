const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const db = require("./connection.js");
const response = require("./response.js");
const { error } = require("console");

// Routes / URL / endpoint utama kita method GET
app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tb_mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "Mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM tb_mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "Get detile mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO tb_mahasiswa (nim, namaLengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;
  db.query(sql, (err, fields) => {
    if (err) throw response(500, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data added sucessfuly", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `UPDATE tb_mahasiswa SET namaLengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = '${nim}'`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "Invalid", "Error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "Update data successfuly", res);
    } else {
      response(500, "User not found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM tb_mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "Invalid", "Error", res);

    if (fields.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "Deleted data succesfuly,", res);
    } else {
      response(404, "User not found", "Error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
