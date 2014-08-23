var youtubeFactory = function ($injector, $timeout, googleAuthFactory ) {

        return {
            API_KEY: 'AIzaSyAnSABpTcJtt9tDfOVFKl6j1PPuWFmKSqQ',
            OAUTH2_CLIENTID: '43179681697-hb5mkrhms4a09o8gsddh6627ldcbedmv.apps.googleusercontent.com',
            OAUTH2_SCOPE: ['https://www.googleapis.com/auth/youtube'],
            resultsMax: 5,
            lastSearch: "",
            responseList: {},
            plResponseList: {},



            /**
             * run a video search on YouTube and make the response available in the callback
             */
            search: function(queryPhrase, callback){
                var that = $injector.get('youtubeFactory');
                if (!googleAuthFactory.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('google apis not loaded, cant search');
                    return;
                }

                // init queryParams for the search
                var queryParams = { part: 'snippet' , type: 'video' , maxResults: this.resultsMax }

                if (queryPhrase) {
                    queryParams.q = queryPhrase;
                }

                if (that.lastSearch !== queryPhrase){
                    that.lastSearch = queryPhrase;
                }

                // init the request object using queryParams
                var requestList = gapi.client.youtube.search.list(queryParams);

                // run the search
                requestList.execute(function(response) {
                    // expose the response to the provided callback
                    callback(response);

                    // also persist the response in the factory itself
                    that.responseList = response;
                });
            },

            /**
             * get the player and embed it
             */
            getPlayer: function(vid) {
                var that = $injector.get('youtubeFactory');
                if (!googleAuthFactory.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('google apis not loaded, cant get player');
                    return;
                }

                // init the request object
                var requestList = gapi.client.youtube.videos.list({
                    part: 'player',
                    id: vid
                    });

                // run the request
                requestList.execute(function(response){
                    // compile the returned HTML string into a for-real HTML element
                    var newElement = $(response.items[0].player.embedHtml);
                    // append the newElement into its place in the view
                    $('div.videoBox').append(newElement);
                });
            },
            getPlaylists: function(callback){
                var that = $injector.get('youtubeFactory');
                if (!googleAuthFactory.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('google apis not loaded, cant get player');
                    return;
                }
                if (!googleAuthFactory.loggedInAsGoogleUser){
                    console.log('google auth not ready, cant get playlist');
                    return;
                }

                var queryParams = { part: 'snippet', mine: true };
                var requestList =  gapi.client.youtube.playlists.list(queryParams);
                requestList.execute(function(response){
                    that.plResponseList = response;
                    callback(response);
                    console.log(response);
                });
            }
        }
};

angular.module('myTubeApp').factory('youtubeFactory',youtubeFactory);

/*
SAMPLE OUTPUT of search.execute:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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
/*

 SAMPLE OUTPUT of playlist.execute:
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[{
    "id": "gapiRpc",
    "result": {
        "kind": "youtube#playlistListResponse",
        "etag": "\"gMjDJfS6nsym0T-NKCXALC_u_rM/4CKkP8Iy5Ura-NgyfpzS9Dz_0M8\"",
        "nextPageToken": "CAUQAA",
        "pageInfo": {
            "totalResults": 12,
            "resultsPerPage": 5
        },
        "items": [
            {
                "kind": "youtube#playlist",
                "etag": "\"gMjDJfS6nsym0T-NKCXALC_u_rM/h0rLd8TKiEJM5SJMwujdQpt5-ao\"",
                "id": "PLbFDzuRaDWYmCpVsHzpqOqjO1vNxF6O_X",
                "snippet": {
                    "publishedAt": "2013-01-20T15: 55: 16.000Z",
                    "channelId": "UCkvOjAtA--7tJoS8CjnWMEw",
                    "title": "BI-BusinessIntelligence",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https: //i.ytimg.com/vi/HAR7uXwn0OI/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https: //i.ytimg.com/vi/HAR7uXwn0OI/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https: //i.ytimg.com/vi/HAR7uXwn0OI/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https: //i.ytimg.com/vi/HAR7uXwn0OI/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https: //i.ytimg.com/vi/HAR7uXwn0OI/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "McNostrill"
                }
            }
        ]
    }
}
]
*/
