var newVidsController = function($scope, $log, appInfo,youtubeFactory) {
    $scope.appInfo = appInfo;
    $scope.showVideoBox = false;
    $scope.searchPhrase = "";
    $scope.youtubeFactory = youtubeFactory;



    $scope.searchVids = function () {
        if ($scope.searchInput) {
            youtubeFactory.search($scope.searchInput, function(response){
                $scope.responseList = response;
                $scope.$digest();
            });
        }
    }

    $scope.embedPlayer = function (vid) {
        youtubeFactory.getPlayer(vid);
        $scope.showVideoBox = true;
    };
    $scope.closeVideo = function(){
        $scope.showVideoBox = false;
        $('div.videoBox').empty();
    };
};
myTubeApp.controller('newVidsController', newVidsController);


