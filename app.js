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

// reset database table
