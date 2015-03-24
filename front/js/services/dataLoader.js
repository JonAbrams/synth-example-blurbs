/*@ngInject*/
module.exports = function($location, $http) {
  return function(params) {
    params = params || {};
    var url = '/api' + $location.path();
    var paramArr = [];

    Object.keys(params).forEach(function(key) {
      paramArr.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      );
    });

    if (paramArr.length > 0) {
      url += '?' + paramArr.join('&');
    }

    return $http.get(url).then(function(res) {
      return res.data;
    });
  };
};
