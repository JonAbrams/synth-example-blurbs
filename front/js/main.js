var dataLoaderRunner = [
  'dataLoader',
  function (dataLoader) { return dataLoader(); }
];

angular.module('blurbs', ['ngRoute', 'mgcrea.ngStrap', 'ngAnimate'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/blurbs', {
    templateUrl: '/html/blurbs/getIndex.html',
    controller: 'blurbsCtrl',
    resolve: {
      data: dataLoaderRunner
    }
  }).when('/blurbs/:blurbsId/comments', {
    templateUrl: '/html/blurbs/comments/getIndex.html',
    controller: 'commentsCtrl',
    resolve: {
      data: dataLoaderRunner
    }
  }).otherwise({
    redirectTo: '/blurbs'
  });

  $locationProvider.html5Mode(true);
})
.service('dataLoader', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api' + $location.path() ).then(function (res) {
        return res.data;
      });
    }
  };
});
