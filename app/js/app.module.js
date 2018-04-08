var app = angular.module('flightApp', ['ngRoute', 'ngMessages', 'ngMaterial']);
// app.component('myComponent', {
//  templateUrl: 'flight/flight-list.html',
//  controller: ('flightController', function($scope){
// })

// });
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/flight', {
        templateUrl: 'app/flight/flight-list.html'
    }).
        otherwise({ redirectTo: '/flight' });
}]);

app.controller('flightController', ['$scope', '$http', function ($scope, $http) {
    var ctrl = this;
    $scope.SearchFlight = function () {
        
        $scope.searchResult = true;
        $scope.loading = true;
        $http.get('app/flight/flight.json')
            .then(function (response) {
                var allFlights = response.data;
                var selectedDesination;
                var selectedDate;
                var slectedSource = allFlights.filter((obj)=>obj.origin == $scope.src);
                if(!$scope.dest){
                    selectedDesination = slectedSource }
                else {
                   selectedDesination = slectedSource.filter((obj)=>obj.destination == $scope.dest);
                }
                if(!ctrl.myDate){
                    selectedDate = selectedDesination }
                else {
                    selectedDate = selectedDesination.filter((obj)=>new Date(obj.date) >= ctrl.myDate);
                }
                $scope.flights = selectedDate;
               $scope.loading = false;
            });
    }

    this.myDate = new Date();
    this.isOpen = false;

}]);