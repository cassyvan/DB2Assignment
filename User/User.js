const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "useradmin", // update me
      password: "MruUser4522" // update me
    },
    type: "default"
  },
  server: "userdb4522.database.windows.net", // update me
  options: {
    database: "UserDB4522", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

queryDatabase();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  connection.connect(function(err) {
    if (err) throw err;
     // Read all rows from table
     const request = new Request(
       `SELECT * FROM Users`,
       (err, rowCount) => {
         if (err) {
           console.error(err.message);
          } else {
            console.log(`${rowCount} row(s) returned`);
          }
          connection.close();
        }
      );

    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });

    connection.execSql(request);
    // connection.close();
  });
}

function addUser(userName) {
  connection.connect(function(err) {
    if (err) throw err;
     // Read all rows from table
     const request = new Request(
      `INSERT INTO Users(Username) Values('${userName}')`,
       (err, rowCount) => {
         if (err) console.error(err.message);
        }
      );
    connection.execSql(request);
    // connection.close();
  });
}

function reomveUser(userName) {
  connection.connect(function(err) {
    if (err) throw err;
     // Read all rows from table
     const request = new Request(
      `DELETE FROM Users WHERE Username = '${userName}'`,
       (err, rowCount) => {
         if (err) console.error(err.message);
        }
      );
    connection.execSql(request);
    // connection.close();
  });
}