const mysql = require("mysql");
const profiler = require("./core/profiler");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "firaga123",
    database: "sports",
    port: "3308"
});

connection.connect();
function executeQuery(query, values = []){
    return new Promise(function(resolve){
        let formatted_query = mysql.format(query, values);

        connection.query(formatted_query, function(err, result){
            if(err){
                profiler.queries[formatted_query] = "error in query processing";
                throw err;
            }
            profiler.queries[formatted_query] = result;
            resolve(result);
        });
    });
};

module.exports = {mysql : mysql, execute : executeQuery, date_now : () => new Date().toISOString().slice(0, 19).replace('T', ' ')};