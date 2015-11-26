# ngPermission

Add authorization to angular route, so restriction route to specific role becomes so easy.

> Note:- Works with **ui.route** as well as **ngRoute** :)

Install via bower:
```sh
bower install ngPermission
```

Install via npm:
```sh
npm install ngpermission
```

Add dependency to you module:
```javascript
angular.module("your app name",["ngPermission"])
```

Add role permission to **ngRoute**:
```javascript
.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        authorizedRole: ['admin']
    })
```

Add role permission to **ui.router**:
```javascript
 .state('view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        authorizedRole: ['admin']
    });
```




Resolve if role is present:
```javascript
.run(['$rootScope', '$timeout','$state', function ($rootScope, $timeout,$state) {

    $rootScope.$on('ngPermission', function (event, defer,toState, toParams, fromState, fromParams) {
     console.log(toState)
        $timeout(function () {
            defer.resolve();
        }, 5000)

        // do what you want to do
    });
}]);
```








