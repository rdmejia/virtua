var mysql = require('mysql');

exports.handler = (event, context, callback) => {
    
var connection = mysql.createConnection({
    host: 'advertising.cjcgw9t4ox6y.us-west-1.rds.amazonaws.com',
    user: 'dba',
    password: 'doritos24+',
    database: 'Advertising'
});

    //Check if connection is OK
    connection.connect(function(error) {
        if (error) {
            console.log('ERROR - Could not connect to the database: ' + error.message);
            //Internal server error, return 500
            callback(JSON.stringify({
                "status": 500,
                "errorMessage": error.message
            }));
        }
    });

    var query = 'SELECT * FROM advertisers';

    connection.query(query, function(error, results, fields) {
        //Close connection
        connection.end();

        if (error) {
            console.log('ERROR - Problem with provided query: ' + error.message);
            //Internal server error, return 500
            callback(JSON.stringify({
                "status": 500,
                "errorMessage": error.message
            }));
        }

        //Successful query
        if (results.length == 0) {
            //No records, return 404
            console.log('ERROR - No records found');
            callback(JSON.stringify({
                "status": 404,
                "errorMessage": "No advertisers found"
            }));
        }

        //Found records
        console.log('OK - Successful query: "' + query + '" with results: ' + results);
        callback(null, {
            "status": 200,
            "response": results
        });
    });
};