const path = require('path')
const express = require('express')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// let scriptPath = process.env.NODE_ENV?"/js/main.js": 'http://localhost:3001/dist/static/js/main.js'
let scriptPath;
let staticPath;
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
  scriptPath = "/js/main.js"
  staticPath = "./static"
} else { 
  scriptPath= "http://localhost:3001/dist/static/js/main.js"
  staticPath = "./dist/static"
}
app.use(express.static(path.resolve(__dirname, staticPath)))
app.get('*', function (req, res) {
  res.render('index', {
    msg: 'HELLO WORLD EJS',
    scriptPath,
    // test:process.env
  })
})

app.listen(3000, function(){
  console.log('3000 listen')
})