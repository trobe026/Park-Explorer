var express = require("express");
var bodyParser = require("body-parser");
<<<<<<< HEAD
var db = require("./models");
=======

var db = require("./models");

>>>>>>> 9ff69e601e641c9b15660a123009f60729718d87
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
});
