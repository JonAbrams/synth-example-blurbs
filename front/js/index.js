var angular = require('angular');

angular.module('blurbs', [require('angular-route')])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/blurbs', {
    templateUrl: '/html/blurbs/getIndex.html',
    controller: 'blurbsCtrl'
  }).when('/blurbs/:blurbsId/comments', {
    templateUrl: '/html/blurbs/comments/getIndex.html',
    controller: 'commentsCtrl'
  }).otherwise({
    redirectTo: '/blurbs'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
.service('dataLoader', require('./services/dataLoader'))
.controller('commentsCtrl', require('./controllers/commentsCtrl'))
.controller('signupCtrl', require('./controllers/signupCtrl'))
.controller('blurbsCtrl', require('./controllers/blurbsCtrl'))
.controller('loginCtrl', require('./controllers/loginCtrl'))
.controller('userCtrl', require('./controllers/userCtrl'));
