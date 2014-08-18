var youtubeFactory = function ($injector, $timeout, $http) {

        return {
            API_KEY: 'AIzaSyAnSABpTcJtt9tDfOVFKl6j1PPuWFmKSqQ',
            readyForAction: false,
            resultsMax: 5,
            lastSearch: "",

            init: function(){
                var that = $injector.get('youtubeFactory');
                if (typeof gapi.client === 'undefined') {
                    console.log('google apis not loaded yet...');
                    $timeout(that.init, 500);
                } else {
                    console.log('google apis LOADED!');
                    gapi.client.load('youtube', 'v3', function(){
                        gapi.client.setApiKey(that.API_KEY);
                        that.readyForAction = true;
                    });
                }
            },

            search: function(queryPhrase, callback){
                if (!this.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('Im Not Ready!!!');
                    return;
                }
                // do search here
                var queryParams = { part: 'snippet' , type: 'video' , maxResults: this.resultsMax }


                if (queryPhrase) {
                    queryParams.q = queryPhrase;
                }
                if (this.lastSearch !== queryPhrase){
                    this.lastSearch = queryPhrase;
                }

                var requestList = gapi.client.youtube.search.list(queryParams);

//                var responseFunc = function (response){
//                    console.log('response: ' + response);
//                    this.responseList = response;
//                };
                requestList.execute(callback);


            },

            getPlayer: function(vid) {
                if (!this.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('Im Not Ready!!!');
                    return;
                }

                var requestList = gapi.client.youtube.videos.list({
                    part: 'player',
                    id: vid
                    });

                requestList.execute(function(response){
                    console.log('response: ');
//                    console.log(response);
                    console.log(response.items[0].player.embedHtml);
                    var newElement = $(response.items[0].player.embedHtml)
                    $('div.videoBox').append(newElement);
                });
            }



        }

};

angular.module('myTubeApp').factory('youtubeFactory',youtubeFactory);



/*

                [
                 {
                  "id": "gapiRpc",
                  "result": {
                   "kind": "youtube#searchListResponse",
                   "etag": "\"gMjDJfS6nsym0T-NKCXALC_u_rM/gUlqxY4MjNKeyJb7MFkVwhm9RGE\"",
                   "nextPageToken": "CAUQAA",
                   "pageInfo": {
                    "totalResults": 1000000,
                    "resultsPerPage": 5
                   },
                   "items": [
                    {
                     "kind": "youtube#searchResult",
                     "etag": "\"gMjDJfS6nsym0T-NKCXALC_u_rM/PhwxpoWDmdb9LXAS0XHOTyIy4kI\"",
                     "id": {
                      "kind": "youtube#video",
                      "videoId": "a2RA0vsZXf8"
                     },
                     "snippet": {
                      "publishedAt": "2010-11-21T05:14:05.000Z",
                      "channelId": "UCplkk3J5wrEl0TNrthHjq4Q",
                      "title": "\"Just A Dream\" by Nelly - Sam Tsui & Christina Grimmie",
                      "description": "Check out our Epic Patty Cake song here! http://www.youtube.com/watch?v=QZpGe5rNJkI&list=PLjbbwHkJGe5nRfXxcDA6nkCY-GWUyDBFi&index=1 Hope ...",
                      "thumbnails": {
                       "default": {
                        "url": "https://i.ytimg.com/vi/a2RA0vsZXf8/default.jpg"
                       },
                       "medium": {
                        "url": "https://i.ytimg.com/vi/a2RA0vsZXf8/mqdefault.jpg"
                       },
                       "high": {
                        "url": "https://i.ytimg.com/vi/a2RA0vsZXf8/hqdefault.jpg"
                       }
                      },
                      "channelTitle": "KurtHugoSchneider",
                      "liveBroadcastContent": "none"
                     }
                    }

                */


////               [


