'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.version',
    'ngPermission'
]).
config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl',
    }).state('view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        url: '/view1',
        controllerAs: 'registration',
        data:{
            "permission":"admin"
        }
    });
    $urlRouterProvider.otherwise('/view1');
}]).controller('View1Ctrl', [function () {}]).controller('View2Ctrl', [function () {

}]).run(['$rootScope', '$timeout','$state', function ($rootScope, $timeout,$state) {

    $rootScope.$on('ngPermission', function (event, defer,toState, toParams, fromState, fromParams) {
     console.log(toState)
        $timeout(function () {
            defer.resolve();
        }, 5000)

        // do what you want to do
    });
}]);