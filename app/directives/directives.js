//configuring custom directive for the video results table

myTubeApp.directive('videoTable', function(youtubeFactory){
        return {
            templateUrl: 'app/templates/videoTable.html',

            link: function(scope, element, attrs) {
                scope.textToShow = attrs.videoTable;
                scope.showVideoBox = false;
                //expose youtubeFactory's response list to the local scope
                scope.responseList = youtubeFactory.responseList;

                //adding two scope functions for the video box popup
                scope.embedPlayer = function (vid) {
                    youtubeFactory.getPlayer(vid);
                    scope.showVideoBox = true;
                };

                scope.closeVideo = function() {
                    scope.showVideoBox = false;
                    //remove all embedded iframes from the div
                    $('div.videoBox').empty();
                };
            }
        }
    });
