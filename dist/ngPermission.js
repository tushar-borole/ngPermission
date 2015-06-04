/**
 *  * @description Route by permission
 * @author Tushar Borole
 * @createDate 31/05/2015
 */

"use strict";



var tryModules = function(names) {
  // accepts a list of module names and
  // attempts to load them, in order.

  // if no options remain, throw an error.
  if( names.length == 0 ) {
    throw new Error("None of the modules could be loaded.");
  }

  // attempt to load the module into m
  var m;
  try {
    m = angular.module("ngRoute")
  } catch(err) {
    m = angular.module("ui.router");
  }

  // if it could not be loaded, try the rest of
  // the options. if it was, return it.
  if( m == null ) return tryModules(names.slice(1));
  else return m;
};

var moduleName=tryModules(["ngRoute", "ui.router"]).name;



if(moduleName=='ui.router') {//s etting for ui router
    console.log(angular)

    angular.module('ui.router');
    angular.module("ngPermission", []).service('ngPermissionService', function ($rootScope, $state, $q) {


        this.role = function (role) {
           
                // Creates a promise chain for each argument
            var defer = $q.defer(); // empty promise
            $rootScope.$broadcast('ngPermission', role, defer, $state.params);

            return defer.promise;

        };

    })

} 

if(moduleName=='ngRoute') {//setting for angualr route
    
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



