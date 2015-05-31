/**
 *  * @description Route by permission
 * @author Tushar Borole
 * @createDate 31/05/2015
 */

"use strict";

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
    angular.forEach($route.routes, function (config) {//itterate the route object to add config

        if (angular.isDefined(config.authorizedRole)) {// if authorization present in config

            if (angular.isDefined(config.resolve)) { // if already resolve is present
                config.resolve.auth = getRouteResolve(config);
            } else { // add new resolve if not present
                config.resolve = {};
                config.resolve.auth = getRouteResolve(config);
            }


        }

    });
}]);