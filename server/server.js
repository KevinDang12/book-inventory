const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { Parser } = require('json2csv');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, '../build');

app.use(express.static(buildPath));

/**
 * Display the Front-end when the users are
 * on the following pathname
 */
app.get(/^(?!\/(data|download|filter|add-book)).+/, (req, res) => {
  res.sendFile(
      path.join(__dirname, '../build/index.html'),
      function(err) {
        if (err) {
          res.status(500).send(err);
        }
      },
  );
});

/**
 * Edit the following to connect to your MySQL database
 * on your local machine. Replace the user and password
 * with your MySQL username and password.
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Add your MySQL username here
    password: 'Mysql_911root', // Add your MySQL password here
    database: 'inventory',
});

/**
 * Connect to the MySQL database
 */
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
});

/**
 * Retrive all the books from the database
 */
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM inventory';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

/**
 * Retrieve the books from the database to download in the selected format
 */
app.get('/download', (req, res) => {
    db.query('SELECT * FROM inventory', (err, results) => {
        if (err) throw err;

        const format = req.query.format;
  
        if (format === 'csv') {
            const parser = new Parser();
            const csv = parser.parse(results);
            res.header('Content-Type', 'text/csv');
            res.attachment('data.csv');
            
            return res.send(csv);
        } else {
            res.header('Content-Type', 'application/json');
            return res.json(results);
        }
    });
});

/**
 * Filter the books based on the selected filter and keywords
 */
app.get('/filter', (req, res) => {
    const { filter, keywords } = req.query;
    const sql = `SELECT * FROM inventory WHERE ${filter} LIKE '%${keywords}%'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

/**
 * Add a new book to the database
 */
app.post('/add-book', (req, res) => {
    const { title, author, genre, date, isbn } = req.body.bookDetails;

    const check = `SELECT * FROM inventory WHERE isbn = '${isbn}'`;
    db.query(check, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send('ISBN already exists');
            return;
        } else {
            const sql = `INSERT INTO inventory (title, author, genre, publication_date, isbn) VALUES ('${title}', '${author}', '${genre}', '${date}', '${isbn}')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}\nThe Server is running`)
});