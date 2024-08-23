

function runQuery(sqlQuery){
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  }
  
  module.exports = {runQuery}