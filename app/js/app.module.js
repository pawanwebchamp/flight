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
        $scope.flightinfo = true;
        $scope.loading = true;
        $scope.hideBanner = true;
        $http.get('app/flight/flight.json')
            .then(function (response) {
                var allFlights = response.data;
                var selectedDesination;
                var selectedDate;
                var returnsDate;
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

                if(!ctrl.returnDate){
                    returnsDate = selectedDesination }
                else {
                    returnsDate = selectedDesination.filter((obj)=>new Date(obj.returndate) >= ctrl.returningDate);
                }
                
                
                $scope.flights = returnsDate;
                $scope.loading = false;
               
            });
    }

    this.myDate = new Date();
    this.returningDate = new Date();
    this.isOpen = false;

    // $scope.color = {
    //     red: Math.floor(Math.random() * 255)
    //   };
    
    //  $scope.disabled1 = Math.floor(Math.random() * 100);

      $scope.cityList = ["Allahabad", "Bangalore", "Delhi", "Kolkata", "Pune", "Mumbai", "Varanasi"];
      $scope.complete=function(string){
          
          var output=[];
          angular.forEach($scope.cityList,function(src){
              if(src.toLowerCase().indexOf(string.toLowerCase())>=0){
                  output.push(src);
              }
          });
          $scope.filterCity=output;
      }
      $scope.fillTextbox=function(string){
          $scope.src=string;
          $scope.filterCity=null;
      }

      $scope.returnCityList = ["Allahabad", "Bangalore", "Delhi", "Kolkata", "Pune", "Mumbai", "Varanasi"];
      $scope.retcomplete=function(string){
          
          var output=[];
          angular.forEach($scope.returnCityList,function(dest){
              if(dest.toLowerCase().indexOf(string.toLowerCase())>=0){
                  output.push(dest);
              }
          });
          $scope.filterReturnCity=output;
      }
      $scope.returnfillTextbox=function(string){
          $scope.dest=string;
          $scope.filterReturnCity=null;
      }

}]);