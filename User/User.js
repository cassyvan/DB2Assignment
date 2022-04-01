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
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM Users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

//Add User record to SQL database
connection.query('INSERT INTO `Users` (`UserID`, `Username`, `Blog`, `Comments`) VALUES (5, "PeterPan", "Neverland", "Happy Thoughts")', function (error, results, fields) {
  if (error) throw error;
  console.log('The response is: ', results);
});

//delete User record from SQL database
connection.query('delete from Users where id=1', function (error, results, fields) {
  if (error) throw error;
  console.log('The response is: ', results);
});