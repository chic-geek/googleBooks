// ============================================================
// APPLICATION CONTROLLERS
// ============================================================
//

// books feed controller
//
var feedController = angular.module('feedController', []);

feedController.controller('FeedDetails', ['$scope', '$http', function($scope, $http) {

  // a little bit of setup...
  var
    resourceUrl = 'https://www.googleapis.com/books/v1/volumes?q=',
    pendingTask;


  // if the search input is empty, we'll populate it with a string
  // of choice, so we don't just see nothing.
  if($scope.search === undefined) {
    $scope.search = 'Javascript';
    fetch();
  }

  // load the results when the input string changes, the results
  // should be fetched only after 800 milliseconds to avoid unnecessary
  // calls to the API.
  $scope.change = function() {
    if(pendingTask) {
      clearTimeout(pendingTask);
    }
    pendingTask = setTimeout(fetch, 800);
  };

  // fetch function to reach out to the API of choice and spit
  // the results out to the $scope.
  function fetch() {
    $http.get(resourceUrl + $scope.search + '&maxResults=20&orderBy=newest')
      .success(function(data) {
        $scope.data = data;
        $scope.bookFeed = data.items;
      });
  }

  // utility function to select all text when input is clicked.
  // applied with onclick="" attr on input element.
  //
  // https://goo.gl/D80ZRg
  $scope.select = function() {
    this.setSelectionRange(0, this.value.length);
  }
}]);
