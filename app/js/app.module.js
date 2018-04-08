var app = angular.module('flightApp', ['ngRoute']);
// app.component('myComponent', {
//  templateUrl: 'flight/flight-list.html',
//  controller: ('flightController', function($scope){
// })

// });
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/flight', {
        templateUrl: '/flight/flight-list.html'
    }).
        otherwise({ redirectTo: 'index.html' });
}]);

app.controller('flightController', ['$scope', '$http', function ($scope, $http) {
    $scope.SearchFlight = function () {
        $scope.searchResult = true;
        $scope.loading = true;
        $http.get('flight/flight.json')
            .then(function (response) {
                $scope.flights = response.data;
               $scope.loading = false;
            });
    }

}]);