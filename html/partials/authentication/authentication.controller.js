(function(){
    "use strict";
    
    var authenticationController = function($scope, $location, authenticationFactory, user) {
    $scope.user = user;

    $scope.login = function() {
    	authenticationFactory.login().then(
    	function(result) {
            console.log(result);
    		$location.path(result);
    	},
    	function(error) {
    		alert('error');
    	});
    	
    }

    $scope.signUp = function() {
    	
    }

    $scope.logout = function() {
    	
    }	
  };

  angular.module('authentication')
    .controller('authenticationController', authenticationController);

})();