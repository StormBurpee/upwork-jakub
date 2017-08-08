var express               = require('express');
var bodyParser            = require('body-parser');
var cookieParser          = require('cookie-parser');
var sReq                  = require('request');
var qString               = require('querystring');
var low                   = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

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

//initialising db (chose lowdb as it's a small solution that we can use for just storing json files)
var db = low('./server_data.json', {
  storage: fileAsync
});
//initialising db defaults
db.defaults({
  pageRequests: [],
  githubRequests: [],
  userAuths: []
}).write();

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
    db.get('userAuths').push({access_token: qString.parse(body).access_token}).write();

    response.json({access_token: qString.parse(body).access_token});
  });
});

router.get('/server/verify', function(request, response) {
  let httpStatus = 0;
  let githubStatus = 0;
  sReq.get('http://localhost:4200', function(err, resp, body){
    httpStatus = resp.statusCode;
    sReq.get('https://api.github.com/', function(err, resp, body){
      githubStatus = resp.statusCode;
      if(githubStatus != 0 || githubStatus != 404)
        githubStatus = "GOOD";

      response.json({siteRespone: httpStatus, apiStatus: 'GOOD', githubStatus: githubStatus});
    });
  });
});

router.get('/server/saverequest/:type/:user/:endpoint', function(request, response) {
  let type = request.params.type;
  let endpoint = request.params.endpoint;
  let user = request.params.user;
  let timestamp = new Date();
  //console.log("Saving request: ", {type: type, endpoint: endpoint, user: user});
  if(type == "page") {
    db.get('pageRequests').push({endpoint: endpoint, user: user, time: timestamp.toUTCString()}).write();
  } else if(type == "github") {
    db.get('githubRequests').push({endpoint: endpoint, user: user, time: timestamp.toUTCString()}).write();
  }
  response.json({type: type, endpoint: endpoint, user: user, timestamp: timestamp.toUTCString()})
});

router.get('/server/accesslog', function(request, response) {
  let pageRequests    = db.get('pageRequests');
  let githubRequests  = db.get('githubRequests');
  let authRequests    = db.get('userAuths');
  response.json({pageRequests: pageRequests, githubRequests: githubRequests, authRequests: authRequests});
});

router.get('/admin/auth/:username', function(request, response) {
  let username = request.params.username;
  if(username == "StormBurpee")
    response.json({auth: true});
  else {
    response.json({auth: false});
  }
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
