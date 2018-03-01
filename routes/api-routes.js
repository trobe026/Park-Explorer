var db = require("../models");
var dotenv = require("dotenv").config();
var request = require('request');

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

module.exports = function(app) {
  app.get("/api/:brews?", function(req, res) {
    // res.json(choice);

    console.log(req.query.brewery)
    console.log(req.query.beer)
    // console.log(choice.beer);
    // console.log(util.inspect(choice, true, null));
    // console.log(choice.join(''));
    // console.log(choice.beer);

    if (req.query.beer === '') {
      console.log('test1')
    } else {
      console.log('test2')
      request.get({
        // method: "GET",
        // url: 'https://api.untappd.com/v4/search/beer?q=' + req.query.beer,
        url: 'https://api.untappd.com/v4/search/beer?' + 'client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET

        + '&q=' + req.query.beer

      }

     , (err, resp, body) => {
        if (err) { console.log(err); }
        // console.log(res);
        // console.log(resp);
        // console.log(body);
        // console.log(body);
        console.log(body.body)
        res.json(body);
        // return body;
      });
      // res.json(body);
    }
  });

<<<<<<< HEAD
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

  app.post("/api/favorites:?", function(req, res){
    db.Users.findOne({
      include:
      [db.User]
      ,
      Where:
      [req.body.fb_id]
    })
  })

  });
=======
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
>>>>>>> 9ff69e601e641c9b15660a123009f60729718d87

  });
  app.post("/api/newBeer", function(req, res) {
    db.BeerInfo.create({
      beer_name: req.body.beer_name,
      beer_desc: req.body.beer_desc,
      beer_abv: req.body.beer_abv,
      beer_labelUrl: req.body.beer_labelUrl,
      brewery_name: req.body.brewery_name,
      UserFbId: req.body.UserFbId
    });
  });

  app.post("/api/deleteBeer", function(req, res) {
    db.BeerInfo.destroy({
      where: {
        beer_labelUrl: req.body.beer_labelUrl
      }
    });
  });

};
