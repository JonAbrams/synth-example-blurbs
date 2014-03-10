angular.module('blurbs', ['ngRoute'])
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

  $locationProvider.html5Mode(true);
})
.controller('blurbsCtrl', function ($scope, $http) {
  if (preloadedData) {
    console.log("Using preloaded data");
    $scope.blurbs = preloadedData;
    preloadedData = null;
  } else {
    console.log("Preloaded data not found, fetching from API");
    $http.get('/api/blurbs').then(function (res) {
      $scope.blurbs = res.data;
    });
  }

  $scope.submit = function () {
    if (!$scope.message) return;
    $http.post('/api/blurbs', { message: $scope.message }).then(function (res) {
      if (!$scope.blurbs) return;
      $scope.blurbs.unshift(res.data[0]);
    });
    $scope.message = "";
  };
})
.controller('commentsCtrl', function ($scope, $http, $routeParams) {
  var blurbsId = $routeParams.blurbsId;
  var url = '/api/blurbs/' + blurbsId + '/comments';

  if (preloadedData) {
    console.log("Using preloaded data");
    $scope.blurb = preloadedData.blurb;
    $scope.comments = preloadedData.comments;
    preloadedData = null;
  } else {
    console.log("Preloaded data not found, fetching from API");
    $http.get(url).then(function (res) {
      $scope.blurb = res.data.blurb;
      $scope.comments = res.data.comments;
    });
  }

  $scope.submit = function () {
    if (!$scope.message) return;
    $http.post(url, { message: $scope.message }).then(function (res) {
      if (!$scope.comments) return;
      $scope.comments.unshift(res.data[0]);
    });
    $scope.message = "";
  };
});
