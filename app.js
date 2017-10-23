'use strict';

// Declare app level module which depends on views, and components
angular.module('cartApp', [
  'ngRoute', 'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
