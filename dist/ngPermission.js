/**
 *  * @description Route by permission
 * @author Tushar Borole
 * @createDate 31/05/2015
 */

"use strict";



var tryModules = function (names) {
    // accepts a list of module names and
    // attempts to load them, in order.

    // if no options remain, throw an error.
    if (names.length == 0) {
        throw new Error("None of the modules could be loaded.");
    }

    // attempt to load the module into m
    var m;
    try {
        m = angular.module("ngRoute")
    } catch (err) {
        m = angular.module("ui.router");
    }

    // if it could not be loaded, try the rest of
    // the options. if it was, return it.
    if (m == null) return tryModules(names.slice(1));
    else return m;
};

var moduleName = tryModules(["ngRoute", "ui.router"]).name;



if (moduleName == 'ui.router') { //setting for ui router


    angular.module('ui.router');
    angular.module("ngPermission", []).run(
        function ($rootScope, $urlRouter, $timeout, $q,$state) {
            // Refuse all state changes
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                var resolveFunction = {
                    "resolve": function () {
                       //unbindStateChangeEvent();
                        $state.go(toState, toParams, { notify: false }).then(function() {
    $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
});;
                    }
                }

                event.preventDefault();
                $timeout(function () {
                    $rootScope.$emit('ngPermission', resolveFunction, toState, toParams, fromState, fromParams);
                }, 0);
            });


            // Create a deferred promise, which we will wait to resolve.
            // Once the promise has been resolved, remove listener and
            // call `$urlRouter.sync()` to get the route processed again
            /* var deferred = $q.defer();

            deferred.promise.then(function () {
                deregisterFunction();
                $urlRouter.sync();
            });
*/


        }
    );

}

if (moduleName == 'ngRoute') { //setting for angualr route

    angular.module("ngPermission", []).run(['$rootScope', '$http', '$route', function ($rootScope, $http, $route) {

        var getRouteResolve = function (config) {
            // create resolve configuration
            var routeResolve = ['$q', '$timeout', function ($q) {

                var defer = $q.defer();
                $rootScope.$broadcast('ngPermission', config.authorizedRole, defer, config);

                return defer.promise;
                }];

            return routeResolve;

        };


        //add dynamic resolve to function
        angular.forEach($route.routes, function (config) { //itterate the route object to add config

            if (angular.isDefined(config.authorizedRole)) { // if authorization present in config

                if (angular.isDefined(config.resolve)) { // if already resolve is present, add a new resolve
                    config.resolve.auth = getRouteResolve(config);
                } else { // add new resolve if not present
                    config.resolve = {};
                    config.resolve.auth = getRouteResolve(config);
                }


            }

        });
}]);



}