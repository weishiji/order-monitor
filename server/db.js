var mysql = require('mysql');
var config = require('../config');

function _exec(sqls,values,after){
    var client = mysql.createConnection(config.db);
    client.connect(function(err){
        if (err) {
            console.log(err);
            return;
        }
        client.query(sqls || '', values || [],function(err,r){          
            after(err,r);
        });
        client.end();
    });
    client.on('error',function(err) {
        if (err.errno != 'ECONNRESET') {
            after("err01",false);
            throw err;
        } else {
            after("err02",false);
        }
    });
}
module.exports = _exec;