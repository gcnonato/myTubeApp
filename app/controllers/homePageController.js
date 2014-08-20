var homePageController = function($scope, $log, appInfo,youtubeFactory) {
    $scope.appInfo = appInfo;
    $scope.youtubeFactory = youtubeFactory;

    // get the results of the last search run
    $scope.getLast = function(){
        youtubeFactory.search(youtubeFactory.lastSearch, function(response){
            $scope.responseList = response;
            $scope.$digest();
        });
    };

    // actually run getLast()
    $scope.getLast();

    $scope.shouldShowIntroVids = function () {

        if (!youtubeFactory.responseList.items){
            // the items array isn't even initialized, so there can't be any items to show, hide the div
            return false;
        }

        if (youtubeFactory.responseList.items.length == 0){
            // there are no items to show, hide the div
            return false;
        } else {
            // otherwise, we do have items returned so show the intro vids div
            return true;
        }
    }
};

myTubeApp.controller('homePageController', homePageController);

