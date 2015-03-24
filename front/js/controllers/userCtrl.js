/*@ngInject*/
module.exports = function ($scope, $http) {
  $scope.logout = function () {
    $http.delete('/api/sessions/token')
    .success(function () {
      $scope.$root.user = null;
    });
  };
};
