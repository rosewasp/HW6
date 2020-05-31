// most of the code framework from helloMysql.js file from lecture

// using express module to create express application
var express = require("express");

// connect to database
var mysql = require('./dbcon.js');

var app = express();

// set main.handlebars as the default layout
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

// handlebar.engine handles everything with .handlebars extension
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// set the port number for the URL
app.set("port", 14989);

// sets the folder from which static files such as images and css code are used
app.use(express.static('public'));

// renders the home.handlebars file at the homepage
app.get("/",function(req,res){
    res.render("home");
});

// renders a page will all the rows from the database table
app.get('/database',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context); // sends the database as a JSON file
  });
});

// inserts into the database table
app.get("/insert", function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)",[req.query.name,req.query.reps,req.query.weight,req.query.date,req.query.lbs],function(err,results){
    if (err){
      next(err);
      return;
    }
    context.results = "Inserted id " + results.insertId;
    res.send(context);
  });
});

// from  helloMysql.js file from lecture, with added keys to queries
app.get("/update",function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

// deletes data from database (from helloMysql.js)
app.get("/delete",function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.send(context);
  });
});


// reset database table
app.get("/reset-table",function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render("home",context);
    });
  });
});

// displays error when desired page is not in server
app.use(function(req,res){
  res.status(404);
  res.render("404");
});

// handles syntax and technical errors
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

// starts the web page and displays the port where it is available
app.listen(app.get("port"),function(){
  console.log("Express started on http://localhost:" + app.get("port") + ";press Ctrl-C to terminate.");
});