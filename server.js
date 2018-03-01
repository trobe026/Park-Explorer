var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
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
require("./routes/brewsearch.js");


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
});
