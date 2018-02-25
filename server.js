var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("app/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
