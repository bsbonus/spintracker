/*
 * server/models/Feature.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;
    // type = ultimate.db.mongoose.type;


// Schema
var schema = new mongoose.Schema({
  folk: { type: Array },
  electronic: { type: Array },
  pop: { type: Array },
  jazz: { type: Array },
  soul: { type: Array },
  rock: { type: Array },
  blues: { type: Array }
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
var GenreGraph = mongoose.model('GenreGraph', schema);

// Public API
exports = module.exports = GenreGraph;

// Insert data.

var genreSet = new GenreGraph({
  'folk': [
    'indie folk', 
    'indie christmas', 
    'freak folk', 
    'alternative country',
    'folk rock', 
    'new weird america', 
    'country rock', 
    'folk-prog', 
    'traditional folk',
    'traditional country', 
    'british folk'
  ],
  'pop': [
    'indie pop',
    'chamber pop',
    'synthpop',
    'singer-songwriter',
    'shimmer pop',
    'noise pop',
    'new wave',
    'dream pop',
    'power pop',
    'alternative pop',
    'acoustic pop'
  ],
  'jazz': [
    'nu jazz',
    'acid jazz',
    'afrobeat',
    'vocal jazz',
    'cool jazz',
    'latin jazz',
    'electro swing',
    'jazz blues',
    'cabaret'
  ],
  'soul': [
    'r&b',
    'turntablism',
    'deep funk',
    'neo soul',
    'classic funk rock',
    'southern soul',
    'motown',
    'old school hip hop',
    'hip hop',
    'underground hip hop'
  ],

  'electronic':[
    'indietronica',
    'indie rock',
    'trip hop',
    'chill-out',
    'downtempo',
    'chillwave',
    'nu-gaze',
    'alternative dance',
    'new rave',
    'big beat',
    'metropolis',
    'dance-punk',
    'ambient',
    'minimal techno',
    'house',
    'microhouse',
    'lounge',
    'progressive house',
    'bass music'
  ]
});

genreSet.save(function(err, genre) {
  if (err) return console.error(err);
});


GenreGraph.remove(function (err) {
  if (err) { throw err; }
});
