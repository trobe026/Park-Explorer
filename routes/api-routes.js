var db = require("../models");
var dotenv = require("dotenv").config();
var request = require('request');

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

module.exports = function(app) {
  app.get("/api1/:brews?", function(req, res) {
    if (req.query.beer === '') {
      // console.log('test1')
    } else {
      console.log('test2')
      request.get({
        url: 'https://api.untappd.com/v4/search/beer?' + 'client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET
        + '&q=' + req.query.beer
      }
     ,(err, resp, body) => {
        if (err) { console.log(err); }
        res.json(body);
      });
    }
  });

app.post("/api/newUser", function(req, res) {
  db.Users.findOrCreate({
    where: {
      fb_id: req.body.fb_id.trim()
    },
    defaults: {
      fb_id: req.body.fb_id.trim(),
      full_name: req.body.full_name.trim()
    }
  });
});

  app.get("/api/favorites", function(req, res){
      db.Users.findAll({
        include:[{
          model: db.Beers,
          required: false
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(function(favorites) {
        res.json(favorites);
      });
  });

  app.post("/api/newBeer", function(req, res) {
    db.Beers.create({
      beer_name: req.body.beer_name,
      beer_desc: req.body.beer_desc,
      beer_abv: req.body.beer_abv,
      beer_labelUrl: req.body.beer_labelUrl,
      brewery_name: req.body.brewery_name,
      UserFbId: req.body.UserFbId
    });
  });

  app.post("/api/deleteBeer", function(req, res) {
    db.Beers.destroy({
      where: {
        beer_labelUrl: req.body.beer_labelUrl
      }
    });
  });

};
