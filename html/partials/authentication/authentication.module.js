(function(){
    "use strict";
	
	angular.module('authentication',[]);
	
	angular.module('authentication')
	.value('user',{
		username:"",
		password:""
	})
	.value('successURL',"/")
	.value('failURL',"#")

	var Routes = function($stateProvider){
	$stateProvider
  	.state('login',
	{
		url:'/login',
		templateUrl:'partials/authentication/login.html',
		controller:'authenticationController'
	});
	
  };

  	angular.module('authentication')
    	.config(Routes)
    	.run(function ($rootScope, $location, user, $http) {
        // keep user logged in after page refresh
	        user = JSON.parse(localStorage.getItem('user')) || user;

	        if (user.authdata) 
	            $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.authdata; 
	        
        	$rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in
	            if ($location.path() !== '/login' && !user.authdata) {
	                $location.path('/login');
	            }
	        });        
        });    
})();