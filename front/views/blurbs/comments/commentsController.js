angular.module('blurbs')
.controller('commentsCtrl', function ($scope, $http, $routeParams, data) {
  var blurbsId = $routeParams.blurbsId;
  var url = '/api/blurbs/' + blurbsId + '/comments';

  $scope.blurb = data.blurb;
  $scope.comments = data.comments;
  $scope.$root.user = data.user;

  $scope.submit = function () {
    if (!$scope.message) return;
    $http.post(url, { message: $scope.message }).success(function (data) {
      if (!$scope.comments) return;
      $scope.comments.unshift(data[0]);
    });
    $scope.message = "";
  };
});
