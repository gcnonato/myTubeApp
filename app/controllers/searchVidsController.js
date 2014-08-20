var searchVidsController = function($scope, $log, appInfo,youtubeFactory) {
    $scope.appInfo = appInfo;
    $scope.searchPhrase = "";
    $scope.youtubeFactory = youtubeFactory;

    // local wrapper for the factory's search() function, in order to pass the callback allowing us to access
    // the results directly on the controller scope
    $scope.searchVids = function () {
        if ($scope.searchInput) {
            youtubeFactory.search($scope.searchInput, function(response){
                $scope.responseList = response;
                $scope.$digest();
            });
        }
    }

    // run searchVids() defined above
    $scope.searchVids();
};
myTubeApp.controller('searchVidsController', searchVidsController);


