/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('HomeCtrl', function ($scope, djs, genreGraphs) {
    $scope.items = djs;
    $scope.genreList = ['pop', 'electronic', 'jazz', 'soul', 'rock', 'blues'];
    $scope.genres = genreGraphs;
  });
};
