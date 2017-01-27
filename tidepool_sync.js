#!/usr/bin/node 
 
'use strict'; 

var config = require('./config.json');
var url = config['mongodb_url'];
var mongodb = require('mongodb') 
var client = mongodb.MongoClient; 
var http = require('http');

// Connect to MongoDB
client.connect(url, function(err, db) { 
  if (err) { 
    console.log('Unable to connect to the mongoDB server. Error:', err); 
  } else { 
    console.log('Connection established to', url); 
    // check for tidepool collection
    /*var tidepool = db.collection('tidepool'); 
    tidepool.find({"last_sync"}).toArray(function(err, result) { 
    }*/

    // Connect to Tidepool
    var options = {
      host: 'api.tidepool.io',
      path: '/auth/login',
      method: 'POST',
      headers: {
        'Authorization': ''
      }
    }
    console.log(options);
    //'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Length': post_data.length
    
    var callback = function(resp) {
      var str = '';
      resp.on('data', function(d) {
        console.log(resp.statusCode);
        str += d;
      });
      resp.on('end', function() {
        console.log('test');
      });
    }
    //console.log(req);

    var req = http.request(options, callback);
    req.write('test');
    req.end();

    process.exit(0);
 
    var entries = db.collection('entries'); 
    var statuses = db.collection('devicestatus'); 
    var treatments = db.collection('treatments'); 
    // Get mongodb entries to sync 
    entries.find({}).toArray(function(err, result) { 
      if (err) { 
        console.log(err); 
      } else if (result.length) { 
        console.log('Found:', result); 
      } else { 
        console.log('No document(s) found with defined "find" criteria!'); 
      } 
      // Sync with tidepool 
 
      //Close connection 
      db.close(); 
    }); 
  }        
}); 

