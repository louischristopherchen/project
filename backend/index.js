const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 1997;

app.set('view engine');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'louis',
    password: 'General88!',
    database: 'penla',
    port: 3306
});
app.get('/', (req, res) => {
    res.send('<h1>Selamat Datang!</h1>');
});
app.get('/listResto', (req, res) => {
    var sql = `select r.nama,r.kapasitasSit,r.imgUrl,r.url,l.kota 
    from resto r 
    join location l 
    on l.locationID = r.locationID;`;
    conn.query(sql,(err,results) => {
        if(err) throw err;
            res.send(results);
   
    })
});

app.get('/doLogin', (req, res) => {
    const { username, password } = req.query;
    // var data ={
    //     username:username,
    //     password:password
    // }
    var sql = `select * from user where username='${username}'and password='${password}'`;
    conn.query(sql,(err,results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
});

app.get('/cekLogin', (req, res) => {
    const { userID } = req.query;
    console.log(userID);
    // var data ={
    //     username:username,
    //     password:password
    // }
    var sql = `select * from user where userID='${userID}'`;
    conn.query(sql,(err,results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));