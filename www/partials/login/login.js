(function() {
    'use strict';

    angular
	    .module('myapp')
	    .controller('Login', Login);

    Login.$inject = ['$scope', '$http'];

    function Login($scope, $http) {
	    /*jshint validthis: true */
        var vm = this;
    }
})();