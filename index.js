// Example express application adding the parse-server module to expose Parse
// compatible API routes.
"use strict"
var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, please check');
}

var api = new ParseServer({
  serverURL: "https://transportforchurch.herokuapp.com/",
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'a5dee5f93e5dce98effcfb4aa30bf5f1',
  masterKey: process.env.MASTER_KEY || 'bb054a15cab720e6b3ef4ca890ec1335'

});

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('production up and ready :)');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
