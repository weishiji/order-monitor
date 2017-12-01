var mysql = require('mysql');
var config = require('../config');

function _exec(sqls,values,after){
    
    var client = mysql.createConnection(config.db);
    var cb = function(err,rs,fields){
        //client.end();
            return values(err,rs,fields)
    }
    var query = client.query(sqls || '', cb || [],function(err,r){          
        after(err,r);
        client.end();
    });

    //console.log(query.sql)
    // client.end(function(err){
    //     console.log(err,'this is error')
    // });

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
