var playlistsController = function($scope, $log, appInfo, youtubeFactory, googleAuthFactory) {
    $scope.appInfo = appInfo;
    $scope.youtubeFactory = youtubeFactory;

    $scope.getPlaylists = function(callback){
        if(!googleAuthFactory.loggedInAsGoogleUser){
            console.log("not signed in as google user, cant get playlists");
            return;
        }
        youtubeFactory.getPlaylists(callback);
    };
    $scope.getPlaylists(function(){$scope.$digest();});
};

myTubeApp.controller('playlistsController', playlistsController);