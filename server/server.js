var express               = require('express');
var bodyParser            = require('body-parser');
var cookieParser          = require('cookie-parser');
var sReq                  = require('request');
var qString               = require('querystring');

var githubCredentials = {
  clientId: 'a096d3ce655c4f0a806f',
  clientSecret: 'c2d6d65d16c09fa078b2854d5ff8ec7d88d3ab40'
}

//Initialise express (the web server)
var app = express();
app.use(cookieParser()); //Cookie parser to set login tokens etc
app.use(bodyParser.urlencoded({extended: true})); // Return in json format
app.use(bodyParser.json()); // same as above.
var port = process.env.PORT || 8080; //Set port of server (needed in angular app)

var router = express.Router(); //Routing for api

// on the root path, we're returning a message stating what this api is.
router.get('/', function(request, response) {
  response.json({message: "Github SPA for fetching user data"});
});

//github authentication
router.get('/authenticate/:hash', function(request, response) {
  let hash = request.params.hash;
  console.log("Authenticating user login hash: " + hash);

  sReq.post({url: "https://github.com/login/oauth/access_token", form:{
    client_id: githubCredentials.clientId,
    client_secret: githubCredentials.clientSecret,
    code: hash
  }}, function(err, resp, body) {
    //console.log(qString.parse(body))

    response.json({access_token: qString.parse(body).access_token});
  });
});

//Cors
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// telling the express app to use the router, on the api path (all requests get sent to /api/{request})
app.use('/api', router);
app.listen(port); // start server on port
console.log("Started SPA Application server.");
