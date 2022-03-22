// const { set } = require("express/lib/application");

// getting
function getData() {
    let url = 'https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==';
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data.response));
        // .then(data => console.log(data.response[0].title));
}

// posting
function postData() {
    const data = { 
        title: 'title',
        text: 'text'
    };
    fetch('https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
}


// Second alternative
// let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://mynotes33.azurewebsites.net/api/Blog?code=vuwV9RVS2pieuavif8Pc6PLV0ubWg7zSYVjtiRE2sOOHVPh3E/RPdw==&title=bar&text=ipsum');
    // xhr.setRequestHeader('Accept', 'application/json');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send();
    // // xhr.send(`{
    // //     'title': '123',
    // //     'text': '456'
    // // }`)