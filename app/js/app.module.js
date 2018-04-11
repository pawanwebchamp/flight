var app = angular.module('flightApp', ['ngRoute', 'ngMessages', 'ngMaterial']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/flight', {
        templateUrl: 'app/flight/flight-list.html'
    }).
        otherwise({ redirectTo: '/flight' });
}]);

app.controller('flightController', ['$scope', '$http', function ($scope, $http) {
    var ctrl = this;
    $scope.price = 1000;
    $scope.SearchFlight = function () {
        $scope.searchResult = true;
        $scope.flightinfo = true;
        $scope.loading = true;
        $scope.hideBanner = true;
        $http.get('app/flight/flight.json')
            .then(function (response) {
                var allFlights = response.data;
                var filteredFlight = allFlights.filter(function(obj){
                    var flag = false;
                        if($scope.src){
                            flag = obj.origin == $scope.src;
                        }
                        if($scope.dest){
                            flag = flag && obj.destination == $scope.dest;
                        }

                        if($scope.myDate){
                            flag = flag && new Date(obj.date) >= ctrl.myDate;
                        }

                        if($scope.returningDate){
                            flag = flag && new Date(obj.returndate) >= ctrl.returningDate;
                        }
                        
                        if($scope.passenger){
                            flag = flag && obj.availabilty >= $scope.passenger;
                        }

                        if($scope.price){
                            flag = flag && obj.amount <= $scope.price;
                        }

                        return flag;
                
                });

                $scope.flights = filteredFlight;
                $scope.loading = false;
               
            });
    }

    this.myDate = new Date();
    this.returningDate = new Date();
    this.isOpen = false;


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