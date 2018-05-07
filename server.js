
const express = require("express");
const nunjucks = require("nunjucks");
const helmet = require("helmet");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const Business = require("./models/business-model");
const User = require("./models/user-model");

const app = express();
const url = "mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME;
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(helmet());
app.use(express.static("public"))
app.use(cookieParser());


nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url, () => {
    console.log('connected to mongodb');
});

app.use("/auth", authRoutes);


//route for homepage
app.get("/", (req, res, next) => {
  res.render("index.html", {user: req.user});
});


//route for homepage post requests
app.post("/", urlencodedParser, (req, res, next) => {
  let param = req.body.searchField;      
  let results = [];      
  
  axios({    
    url: "https://api.yelp.com/v3/businesses/search",
    headers: {"Authorization": "Bearer " + process.env.YELP_API_KEY},
    params: {location: param, limit: 40, categories: "restaurants,bars"}
  }).then((response) => {     
    for(let item of response.data.businesses) {      
      let image_url = item.image_url;
      let name = item.name;
      let url = item.url;
      let id = item.id;    
      let price = item.price;
      let rating = item.rating;
      let review_count = item.review_count;
      let business = {id: id, name: name, image_url: image_url, url: url, price: price, rating: rating, review_count: review_count};
      results.push(business);               
    }        
    res.render("index.html", {results: results, user: req.user});
  }).catch((e) => next(e));
  
});



//default route
app.get("*", (req, res) => {
  res.status(404).end("Page not found");
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});



const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});


