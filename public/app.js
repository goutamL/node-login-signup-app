var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap']);

  app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

 	$routeProvider
 		.when('/',{
 			templateUrl: 'views/home.html'
 		})
 		.when('/login',{
 			templateUrl: 'views/login.html',
 			controller: 'LoginCtrl'
 		})
 		.when('/signup',{
 			templateUrl: 'views/signup.html',
 			controller: 'SignupCtrl'
 		})
 		.when('/contactus',{
 			templateUrl: 'views/contactus.html',
 			controller: 'ContactCtrl'
 		})
 		.when('/dashboard',{
 			templateUrl: 'views/dashboard.html'
 		})
 		.otherwise({
        	redirectTo: '/'
      })
 })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    });
  });