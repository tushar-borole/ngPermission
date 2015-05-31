# ngPermission

Add authorization to angular route, so restriction route to specific tole becomes so easy.


Install via bower:
```sh
bower install ngPermission
```

Install via npm:
```sh
npm install ngPermission
```

Add dependency to you module:
```javascript
angular.module("your app name",["ngPermission"])
```

Add role permission to route:
```javascript
.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        authorizedRole: ['admin']
    })
```


Resolve if role is present:
```javascript
.run(['$rootScope', '$http', '$route', function ($rootScope, $http, $route) {
    $rootScope.$on('ngPermission', function (event,roles, defer,routeObject) {
    // do what you want to do
    //role ["admin"]
    //routeObject {templateUrl: 'view1/view1.html',controller: 'View1Ctrl',authorizedRole: ['admin']}
        $http.get('/someUrl').success(function(data){
         var indexRole = roles.indexOf(data.role);
         if(indexRole!=-1){
         defer.resolve();
         }
        });
    });
}])
```








