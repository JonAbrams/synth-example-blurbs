angular.module('blurbs')
.controller('blurbsCtrl', function ($scope, data, $http) {
  $scope.blurbs = data.blurbs;
  $scope.$root.user = data.user;

  $scope.submit = function () {
    if (!$scope.message) return;
    $http.post('/api/blurbs', {
      message: $scope.message,
      user: $scope.$root.user
    })
    .success(function (data) {
      if (!$scope.blurbs) return;
      $scope.blurbs.unshift(data[0]);
    });
    $scope.message = "";
  };

  $scope.loadMore = function () {
    var latestBlurb = $scope.blurbs[$scope.blurbs.length - 1];
    $scope.loadingMore = true;

    $http.get('/api/blurbs?toDate=' + latestBlurb.created_at)
    .success(function (data) {
      $scope.loadingMore = false;
      $scope.noMore = data.length < 5;
      $scope.blurbs = $scope.blurbs.concat(data);
    });
  };
});
