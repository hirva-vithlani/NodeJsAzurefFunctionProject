const { app } = require('@azure/functions');
const sql = require('../../node_modules/mssql/msnodesqlv8');
const express = require('express');
const bodyparser = require('body-parser');
const job = express();
//Configuring express server
job.use(bodyparser.json());

// Connect to SQL Server using Windows Auth
const conn = new sql.ConnectionPool({
    connectionString: 'Driver={ODBC Driver 18 for SQL Server};Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=yes;TrustServerCertificate=yes'
});

conn.connect()
    .then(function () {
      console.log("Connected to SQL Server");
    })
    .catch(function (err) {
      console.log(err);
    }
    );

    //Creating GET Router to fetch all the learner details from the MySQL Database
    job.get('/employees' , (req, res) => {
    conn.query('SELECT * FROM tblEmployee', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


// sql.connect((err => {
//         if(!err)
//         console.log('Connection Established Successfully');
//         else
//         console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
//         }));


// const config = {
//     driver: 'msnodesqlv8',
//     connectionString: 'Driver=SQL Server;Database=master;Server=localhost\\SQLEXPRESS;Trusted_Connection=true;'
//   };

//   var mysqlConnection = new sql.ConnectionPool(config);

// //MySQL details
// // var mysqlConnection = mysql.createConnection({
// //     // host: 'localhost',
// //     // user: 'root',
// //     // password: 'edu1234',
// //     database: 'master',
// //     server: 'localhost\\SQLEXPRESS',
// //     driver: 'msnodesqlv8',
// //     options: {
// //       trustedConnection: true
// //     }
// //     // multipleStatements: true
// //     });

// mysqlConnection.connect((err => {
//         if(!err)
//         console.log('Connection Established Successfully');
//         else
//         console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
//         }));

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 9229;
job.listen(port, () => console.log(`Listening on port ${port}..`));