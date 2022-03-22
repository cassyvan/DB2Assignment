
// async function GetData() {

//     try {
//       const response = await fetch('https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==', {
//         method: 'GET',
//         headers: new Headers({'content-type': 'application/json'}),
//         mode: 'no-cors'
//       });
  
//       if (!response.ok) {
//         throw new Error();
//       }
//       console.log(response)
//       const result = await response.json();
//       console.log(result)
//       return result;
//     } catch (err) {
//       console.log(err);
//     }
// }

// GetData();

const db = require("../Lib/db");
await db.init(context);
let context = 'https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw=='
module.exports = async function(context) {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};