/*
 * server/models/Track.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;
    // type = ultimate.db.mongoose.type;

// var app = require('../app');

//mongoose.connect('mongodb://localhost/test');

// Schema
var schema = new mongoose.Schema({
  artist: { type: String },
  song: { type: String },
  album: { type: String },
  label: { type: String },
  airtime: { type: String },
  airdate: {type: String },
  genres: {
    top_level: {type: Array},
    low_level: {type: Array}
  }
});

// Restify
schema.restify = {
  'list,get': '*',
  'post,put,delete': {
    'admin': '*'
  }
};

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

// Model
var Track = mongoose.model('Track', schema);

// Public API
exports = module.exports = Track;

// Insert data.

var anneLitt = require('../../data/AnneLitt/Anne_Litt_2010_tagged_v2.json');

var tracks = [];

for (var day in anneLitt){
  if (anneLitt[day].length > 0){
    anneLitt[day].forEach(function(track){
      var trackObj = {};
      trackObj.artist = track['artist'];
      trackObj.song = track['song'];
      trackObj.album = track['album'];
      trackObj.label = track['label'];
      trackObj.airtime = track['airtime'];
      trackObj.airdate = day;
      trackObj.genres = track['tags'];
      tracks.push(trackObj);
    });
  }
}

tracks.forEach(function(data){
  var track = new Track({
    artist: data.artist,
    song: data.song,
    album: data.album,
    label: data.label,
    airtime: data.airtime,
    genres: {
      top_level: data.genres.top_level,
      low_level: data.genres.low_level
    }
  });

  track.save(function(err, track) {
    if (err) return console.error(err);
  });
});


Track.remove(function (err) {
  if (err) { throw err; }
});
