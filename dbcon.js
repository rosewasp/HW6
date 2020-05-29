var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_sharmabh',
  password        : '1720',
  database        : 'cs290_sharmabh'
});

module.exports.pool = pool;