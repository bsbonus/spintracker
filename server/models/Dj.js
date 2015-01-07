/*
 * server/models/Feature.js
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
  name: { type: String, required: true },
  tag_line: { type: String },
  img: { type: String }
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
var Dj = mongoose.model('Dj', schema);

// Public API
exports = module.exports = Dj;

// Insert data.

var djList = [
  { name: 'anne litt', 
    tag_line: 'Unexpected choices in progressive pop and new rhythms.', 
    img: 'anne_litt.jpg'
  },
  { name: 'aaron byrd', 
    tag_line: 'A Global Exploration of Sounds.', 
    img: 'aaron_byrd.jpg'
  },
  {
    name: 'anthony valadez', 
    tag_line: "Broken beats, soulful key chords with guitar fuzz, combined with yesterday's dusty drums with tomorrow's samples and sounds.",
    img: 'anthony_valadez.jpg'
  },
  { name: 'bo leibowitz', 
    tag_line: "Strictly jazz.", 
    img: 'bo_leibowitz.jpg'
  },
  { name: 'chris douridas', 
    tag_line: "New releases in all genres.", 
    img: 'chris_douridas.jpg'
  },
  { name: 'dan wilcox', 
    tag_line: "Unearthing new discoveries, remixes and rarities, b-sides and lost classics.",
    img: 'dan_wilcox.jpg'
  },
  { name: 'garth trinidad', 
    tag_line: "An international mix of future soul, deep dance, indie rock, and jazz.",
    img: 'garth_trinidad.jpg'
  },
  { name: 'gary calamar', 
    tag_line: "Adventurous pop music, both timely and timeless.",
    img: 'gary_calamar.jpg'
  },
  { name: 'henry rollins', 
    tag_line: "Henry Rollins hosts a great mix of all kinds from all over from all time.",
    img: 'henry_rollins.jpg'
  },
  { name: 'jeremy sole', 
    tag_line: 'A Sonic trip through the past, present and future of Roots music.',
    img: 'jeremy_sole.jpg'
  },
  { name: 'mario cotto', 
    tag_line: "A kaleidoscopic Dada dance party!",
    img: 'mario_cotto.jpg'
  },
  { name: 'raul campos', 
    tag_line: "Raul Campos creates a mix of emerging artists and current favorites, bringing essential cuts from around the world and a little closer to home -- from soulful grooves and fresh remixes to Latin rhythms and indie rock.",
    img: 'raul_campos.jpg'
  },
];

/*djList.forEach(function(data){
  var dj = new Dj({
    name: data.name,
    tag_line: data.tag_line,
    img: data.img
  });

  dj.save(function(err, dj) {
    if (err) return console.error(err);
  });
});


Dj.remove(function (err) {
  if (err) { throw err; }
});*/
