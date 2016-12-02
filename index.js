// Example express application adding the parse-server module to expose Parse
// compatible API routes.
"use strict"
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, please check');
}

var riderPushCert = __dirname + '/certs/Rider_Prod.p12';
var driverPushCert = __dirname + '/certs/Driver_Prod.p12';

if (!riderPushCert || !driverPushCert) {
  console.log('Could not read P12 files');
}else{
  console.log('Successfully read all P12 files ' + driverPushCert);
}

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';

var api = new ParseServer({
  serverURL: "https://transportforchurch.herokuapp.com/parse",
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'localAppId',
  masterKey: process.env.MASTER_KEY || 'localKey',
  push: {
    ios: [
      {
        pfx: riderPushCert,
        bundleId: 'org.rccg.TransportForChurch',
        production: true
      }
    ]
  }

});

var app = express();


app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('production up and ready :)');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
