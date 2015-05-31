/**
 *  * @description Route by permission
    * @author Tushar Borole
    * @createDate 31/05/2015
    */

"use strict";

angular.module("ngPermission", []).run(['$rootScope', '$http', '$route', function ($rootScope, $http, $route) {

    //add dynamic resolve to function
    angular.forEach($route.routes, function (config) {

        if (angular.isDefined(config.authorizedRole)) {
            config.resolve = {
                auth: ['$q', '$timeout', function ($q, $timeout) {

                    var defer = $q.defer();
                    $timeout(function () {
                        $rootScope.$broadcast('ngPermission', config.authorizedRole,defer,config);
                        //defer.resolve();
                    }, 2000);
                    return defer.promise;
                }]
            }
        }

    });
}]);