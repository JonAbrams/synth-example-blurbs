angular.module('blurbs')
.controller('signupCtrl', function ($scope, $http) {
  $scope.showError = function (model) {
    return {
      'has-error': model.$dirty && model.$invalid
    };
  };

  $scope.$watch('user.password + confirmPassword', function () {
    if ($scope.user && !$scope.user.password || !$scope.confirmPassword) return;

    $scope.signupForm.confirmPassword.$setValidity(
      'match',
      $scope.user.password === $scope.confirmPassword
    );
  });

  $scope.submittable = function () {
    return !$scope.submitting &&
      $scope.user &&
      $scope.user.username &&
      $scope.user.password &&
      $scope.user.password == $scope.confirmPassword;
  };

  $scope.signup = function () {
    $scope.submitting = true;
    $http.post('/api/users', this.user)
    .success(function (result) {
      $scope.$root.user = result.user;
      $scope.$hide();
    })
    .error(function (err) {
      $scope.signupForm.username.$setValidity('taken', !err.usernameTaken);
      $scope.signupForm.email.$setValidity('taken', !err.emailTaken);
    })
    .finally(function () {
      $scope.submitting = false;
    });
  };
})
.controller('loginCtrl', function ($scope, $http) {
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
})
.controller('userCtrl', function ($scope, $http) {
  $scope.logout = function () {
    $http.delete('/api/sessions/token')
    .success(function () {
      $scope.$root.user = null;
    });
  };
});
