/*@ngInject*/
module.exports = function ($scope, dataLoader, $http) {
  dataLoader().then(function (data) {
    $scope.blurbs = data.blurbs;
    $scope.$root.user = data.user;
  });

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

    dataLoader({ toDate: latestBlurb.created_at }).then(function (data) {
      var newBlurbs = data.blurbs;
      $scope.loadingMore = false;
      $scope.noMore = newBlurbs.length < 5;
      $scope.blurbs = $scope.blurbs.concat(newBlurbs);
    });
  };
};
