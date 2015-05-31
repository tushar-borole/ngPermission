'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
    'ngPermission'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    }).when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        authorizedRole: ['admin']
    });
    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}]).controller('View1Ctrl', [function () {}]).controller('View2Ctrl', [function () {

}]).run(['$rootScope', '$timeout', '$route', function ($rootScope, $timeout, $route) {

    $rootScope.$on('ngPermission', function (event,roles, defer) {
        //alert("inn")
        console.log(roles)
        $timeout(function(){
             defer.resolve();
        },2000)
   
            // do what you want to do
    });
}]);