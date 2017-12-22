var mysql = require('mysql');
var config = require('../config');
config.db.connectionLimit = 2;
config.db.queueLimit = 20000;
var pool  = mysql.createPool(config.db);
function _exec(sqls,values){
    
    var cb = function(err,rs,fields){
        if (err) throw err;
        return values(err,rs,fields)
    }
    console.log(sqls)
    pool.query(sqls, cb);
}
module.exports = _exec;
