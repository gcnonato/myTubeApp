var homePageController = function($scope, $log, appInfo,youtubeFactory) {
    $scope.appInfo = appInfo;
    $scope.showVideoBox = false;

    $scope.getLast = function(){
        youtubeFactory.search(youtubeFactory.lastSearch, function(response){
            $scope.responseList = response;
            $scope.$digest();
        });
    };
    $scope.embedPlayer = function (vid) {
        youtubeFactory.getPlayer(vid);
        $scope.showVideoBox = true;
    };
    $scope.closeVideo = function(){
        $scope.showVideoBox = false;
        $('div.videoBox').empty();
    };

    $scope.getLast()
};
myTubeApp.controller('homePageController', homePageController);

