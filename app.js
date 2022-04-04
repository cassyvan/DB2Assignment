const express = require("express")
const app = express()
const path = require('path')

app.use(express.static("public"))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'public/home.html'))
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));