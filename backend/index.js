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
    const {search} = req.query;
    
    if(search)
    {
        var sql = `select r.*,l.kota,avg(ra.angkaRating) as rating
        from resto r 
        join location l 
        on l.locationID = r.locationID
        left join  rating ra
        on ra.restoID =r.restoID
        where l.kota like '%${search}%'or r.nama like '%${search}%'
        group by restoID;`;
    }
    else{
    var sql = `select r.*,l.kota,avg(ra.angkaRating) as rating
    from resto r 
    join location l 
    on l.locationID = r.locationID
    left join  rating ra
    on ra.restoID =r.restoID
    group by restoID`;}
        conn.query(sql,(err,results) => {
            if(err) throw err;
            // console.log(results[0].rating)
            for(var index in results)
            {
                if(results[index].rating===null)
                {
                    results[index].rating="unrate";
                }
                // console.log(results[index].rating);
            }
                res.send(results);
        })
    
  
});

app.get('/detailResto', (req, res) => {
    const {id} = req.query;
    
 
        var sql = `select r.*,l.kota,avg(ra.angkaRating) as rating
        from resto r 
        join location l 
        on l.locationID = r.locationID
        left join  rating ra
        on ra.restoID =r.restoID
        where r.restoID=${id}
        group by restoID;`;
   
        conn.query(sql,(err,results) => {
            if(err) throw err;
            // console.log(results[0].rating)
            for(var index in results)
            {
                if(results[index].rating===null)
                {
                    results[index].rating="unrate";
                }
                // console.log(results[index].rating);
            }
                res.send(results);
        })
    
  
});

app.get('/menuResto', (req, res) => {
    const {id} = req.query;
    
 
        var sql = `select * from food
        where restoID=${id};`;
   
        conn.query(sql,(err,results) => {
            if(err) throw err;
                res.send(results);
        })
    
  
});
app.get('/cekSit', (req, res) => {
    const {bookDate,restoID} = req.query;
    // console.log(bookDate,restoID);
 
        var sql = `select sum(bookSit) as bookSit from book 
                    where bookDate ="${bookDate}" and restoID="${restoID}";`;
   
        conn.query(sql,(err,results) => {
            if(err) throw err;
            // console.log(results[0].rating)
        //    console.log(results);
                res.send(results);
        })
    
  
});

app.get('/doLogin', (req, res) => {
    const { username, password } = req.query;
    var data ={
        username:username,
        password:password
    }
    var sql = `select * from user where username='${username}'and password='${password}'`;
    conn.query(sql,data,(err,results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    })
});

app.get('/cekLogin', (req, res) => {
    const { userID } = req.query;
    // console.log(userID);
    var data ={
       userID:userID
    }
    var sql = `select * from user where userID='${userID}'`;
    conn.query(sql,data,(err,results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    })
});

app.post(`/addToCart/:id`,(req,res)=>{
    var {id}= req.params;
    const {dataOrder,dataFood,totalHarga,userID}=req.body;
    const {bookDate,jam,bookSit,keterangan}=dataOrder;
    var data = { 
        userID:userID,
        bookDate:bookDate,
        bookHour:jam,
        bookSit:bookSit,
        deskripsi:keterangan,
        grandTotalHarga:totalHarga,
        restoID:id
    };
    var sql=`insert into cart set ?`;
    conn.query(sql,data,(err, results) => {
        if(err) throw err; 
        // console.log(results.insertID);
        if(dataFood.length!==0)
        {
            
            sql="insert into detailcart (cartID,foodID,totalHarga,jlhPesanan) values ?"
            var data2=[]
            for(var index in dataFood)
            {
                data2.push([results.insertId,dataFood[index].foodID,dataFood[index].totalHarga,dataFood[index].jlhPesanan]);
                
            }
            
            conn.query(sql,[data2],(err,results)=>{
                if(err)throw err;
                sql="select * from cart"
                conn.query(sql,(err,results)=>{
                    if(err)throw err;
                    res.send(results);
                })
            })    
        }
        else{
            sql="select * from cart"
        conn.query(sql,(err,results)=>{
            if(err)throw err;
            res.send(results);
        })
        }
        
    })

    // console.log(totalHarga);
    // console.log(id);
    // console.log(bookDate,dataFood.length,jam,bookSit,keterangan);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));