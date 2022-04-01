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

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

 // Read all rows from table
 const request = new Request(
  `SELECT * FROM Users`,
  (err, rowCount) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${rowCount} row(s) returned`);
    }
  }
);

request.on("row", columns => {
  columns.forEach(column => {
    console.log("%s\t%s", column.metadata.colName, column.value);
  });
});

connection.execSql(request);
}