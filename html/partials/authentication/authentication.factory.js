(function(){
    "use strict";
    var authenticationFactory = function($http,$q,$location,user,successURL) {
    return{
        login:login,
        logout:logout
    }

    function login() {
        var deferred = $q.defer();
        if (user.username != ""
            && user.password != "") {
            //implement your authenticatoin api etc. here
            /*
            $http(
            {
                method: 'POST', 
                url: "https://someurl,
                headers:{'Content-Type': 'application/json'},                
                data: user
            })
            .success(function(response) 
            {    
                loginSucess(response);   
                deferred.resolve(successURL);
            })
            .error(function(response)
            {
                console.log('Login Failed');
                deferred.reject(response);
            });*/
            
            //dummy implementation
            var response = {
                token:"blahblah",
                profile:{
                    name:"test user",
                    email:"test@email.com"
                }
            };
            loginSuccess(response);
            deferred.resolve(successURL);

        }
        else
            deferred.reject();

        return deferred.promise;
    }
    function loginSuccess(response){

        console.log('Login Sucess');
        delete user.password;
        user.profile = response.profile;
        user.authdata = response.token;
        localStorage.setItem('user',JSON.stringify(user));
    }
    function signUp() {
    	
    }

    function logout() {

    	localStorage.clear();
        delete user.authdata;
        $location.path('/login');

    }	
  };
  var httpAuthInterceptor = function($q, $location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
  };

  angular.module('authentication')
    .factory('authenticationFactory', authenticationFactory)
    .factory('httpAuthInterceptor',httpAuthInterceptor)
    .config(function($httpProvider){
        $httpProvider.interceptors.push('httpAuthInterceptor');
    });
})();