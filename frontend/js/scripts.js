'use strict';

const socket = io();
const app = angular.module('app', []);

app.controller('HelloCtrl', function($scope) {
  $scope.title = "This is a title";
});
