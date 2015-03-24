/*@ngInject*/
module.exports = function ($scope, $http) {
  $scope.showError = function (model) {
    return {
      'has-error': model.$dirty && model.$invalid
    };
  };

  $scope.login = function () {
    $scope.submitting = true;
    $http.post('/api/sessions', this.user)
    .success(function (result) {
      $scope.$root.user = result.user;
      $scope.$hide();
    })
    .error(function (err) {
      $scope.loginForm.username.$setValidity('notFound', !err.userNotFound);
      $scope.loginForm.password.$setValidity('invalid', !err.invalidPassword);
    })
    .finally(function () {
      $scope.submitting = false;
    });
  };
};
