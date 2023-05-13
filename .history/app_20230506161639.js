const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./database/mysqlDB');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// GET all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE _id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST a new user
app.post('/users', (req, res) => {
  const { name, email, gender, phoneNo, password } = req.body;
  const sql = `INSERT INTO users (name, email, gender, phoneNo, password) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [name, email, gender, phoneNo, password], (err, result) => {
    if (err) throw err;
    res.send({msg:'User created'});
  });
});

// PUT/update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, gender, phoneNo, password } = req.body;
  const sql = `UPDATE users SET name = ?, email = ?, gender = ?, phoneNo = ?, password = ? WHERE _id = ?`;
  db.query(sql, [name, email, gender, phoneNo, password, id], (err, result) => {
    if (err) throw err;
    res.send({msg:'User updated'});
  });
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE _id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
   
    res.send({msg:'User Deleted'});
  });
});


// GET all msg
app.get('/msg', (req, res) => {
  const sql = 'SELECT * FROM contactus';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST a new msg
app.post('/msg', (req, res) => {
  const { name, email, phoneNo, message } = req.body;
  const sql = `INSERT INTO contactus (name, email, phoneNo, message) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, phoneNo, message], (err, result) => {
    if (err) throw err;
    res.send({msg:'msg created'});
  });
});

// DELETE a msg by ID
app.delete('/msg/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM contactus WHERE _id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
   
    res.send({msg:'msg Deleted'});
  });
});

// ///////// project request
// // GET all project req
// app.get('/project', (req, res) => {
//   const sql = 'SELECT * FROM project';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // POST a new user
// app.post('/project', (req, res) => {
//   const { name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address } = req.body;
//   const sql = `INSERT INTO project (name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address) VALUES (?, ?,?, ?, ?, ?,?,?)`;
//   db.query(sql, [name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address], (err, result) => {
//     if (err) throw err;
//     res.send({msg:'project created'});
//   });
// });

// // PUT/update a user by ID
// app.put('/project/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, email, status, phoneNo, clgName,projectDocumentation,projectLanguage,address } = req.body;
//   const sql = `UPDATE project SET name = ?, email = ?, status = ?, phoneNo = ?, clgName = ?,projectDocumentation=?,projectLanguage=?,address=? WHERE _id = ?`;
//   db.query(sql, [name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address, id], (err, result) => {
//     if (err) throw err;
//     res.send({msg:'project updated'});
//   });
// });
////////////// project request
// GET all furniture req
app.get('/furniture', (req, res) => {
  const sql = 'SELECT * FROM furniture';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST a new user
app.post('/project', (req, res) => {
  const { name, email, status, phoneNo,clgName, furniture,projectLanguage,deliveryAddress } = req.body;
  const sql = `INSERT INTO project (name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address) VALUES (?, ?,?, ?, ?, ?,?,?)`;
  db.query(sql, [name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address], (err, result) => {
    if (err) throw err;
    res.send({msg:'project created'});
  });
});

// PUT/update a user by ID
app.put('/project/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, status, phoneNo, clgName,projectDocumentation,projectLanguage,address } = req.body;
  const sql = `UPDATE project SET name = ?, email = ?, status = ?, phoneNo = ?, clgName = ?,projectDocumentation=?,projectLanguage=?,address=? WHERE _id = ?`;
  db.query(sql, [name, email, status, phoneNo,clgName, projectDocumentation,projectLanguage,address, id], (err, result) => {
    if (err) throw err;
    res.send({msg:'project updated'});
  });
});
