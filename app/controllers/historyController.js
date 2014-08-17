var historyController = function($scope, $log, appInfo,youtubeFactory) {
    $scope.sortBy = 'name';
    $scope.reverse = true;
    $scope.customerLimit = 10;
    $scope.customers = [];
    $scope.appInfo = appInfo;
};

function init() {};
init();

myTubeApp.controller('historyController', historyController);