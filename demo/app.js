'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
    'ngPermission'
]).
config(['$routeProvider','ngPermissionProvider', function ($routeProvider,helper) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl',
    }).when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
             abstract: true,
        authorizedRole: ['admin'],
           resolve: helper.resolveFor('toaster', 'registrationreseller', 'ui.select')
    });
    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}]).controller('View1Ctrl', [function () {}]).controller('View2Ctrl', [function () {

}]).run(['$rootScope', '$timeout', '$route', function ($rootScope, $timeout, $route) {

    $rootScope.$on('ngPermission', function (event, defer) {
        //alert("inn")
        console.log(defer)
        $timeout(function () {
            defer.resolve();
        }, 2000)

        // do what you want to do
    });
}]);