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
         url: '/view2',
        data:false
    }).state('view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        url: '/view1',
        controllerAs: 'registration',
        data:true
    });
    $urlRouterProvider.otherwise('/view1');
}]).controller('View1Ctrl', [function () {}]).controller('View2Ctrl', [function () {

}]).run(['$rootScope', '$timeout','$state', function ($rootScope, $timeout,$state) {

    $rootScope.$on('ngPermission', function (event, defer,toState, toParams, fromState, fromParams) {
console.log(toState)
if(toState.data){
        $timeout(function () {
            defer.resolve();
        }, 2000)
}else{
     defer.resolve();  
}

        // do what you want to do
    });
}]);