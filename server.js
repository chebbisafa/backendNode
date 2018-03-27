
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.por || 3000;
var router = express.Router();
var mysql = require("mysql");
var cors = require('cors')
 app.use(cors({
     origin:'http://localhost:4200'
 }))
var mysqldb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testpfe"
});
mysqldb.connect(function(err) {
    if (err) throw err
    else 
    console.log('You are now connected...')
  
  })
app.use("/api/Allusers", router);
router.get("/", function (req, res, next) {
  
        mysqldb.query("SELECT * FROM user", function (err, result, fields) {
            if (err) throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        });
    });
app.use("/api/Adduser", router);
router.post("/", function (req, res, next) {
    var email = req.param('email')
    var pwd= req.param('pwd');
    var user= {

        email : email,

        pwd : pwd
    }
    mysqldb.query('INSERT INTO users VALUES ?',user, function(error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');    
        }
        });
    });

app.listen(port, function () {
    console.log("Express server running on port %d", port);
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });