/*
 * server/models/Feature.js
 */

'use strict';

var ultimate = require('ultimate');

var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;
    // type = ultimate.db.mongoose.type;

// var app = require('../app');

// Schema
var schema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String }
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
var model = mongoose.model('Feature', schema);

// Public API
exports = module.exports = model;

// Insert data.
var data = [
  {
    name: 'Anne Litt',
    bio: 'A cool kcrw dj'
  },
];
model.remove(function (err) {
  if (err) { throw err; }
  model.create(data, function (err) {
    if (err) { throw err; }
  });
});
