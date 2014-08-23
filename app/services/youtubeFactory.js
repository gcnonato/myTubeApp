var youtubeFactory = function ($injector, $timeout) {

        return {
            API_KEY: 'AIzaSyAnSABpTcJtt9tDfOVFKl6j1PPuWFmKSqQ',
            OAUTH2_CLIENTID: '43179681697-hb5mkrhms4a09o8gsddh6627ldcbedmv.apps.googleusercontent.com',
            OAUTH2_SCOPE: ['https://www.googleapis.com/auth/youtube'],
            readyForAction: false,
            resultsMax: 5,
            lastSearch: "",
            responseList: {},
            //will use this later when i need to distinguish users that are logged in and users that aren't
            loggedInAsGoogleUser: false,

            /**
             * init the google API client and set the readyForAction flag
             */
            init: function(){
                // since this function is called as a callback, we'll need "this" to really be the factory
                var that = $injector.get('youtubeFactory');
                if (typeof gapi.client === 'undefined') {
                    console.log('google apis not loaded yet...');
                    // if not ready yet, try again in half a second
                    $timeout(that.init, 500);
                } else {
                    console.log('google apis LOADED!');
                    gapi.client.load('youtube', 'v3', function(){
                        gapi.client.setApiKey(that.API_KEY);
                        // NOW we're actually ready to use the YouTube API
                        that.readyForAction = true;
                    });
                }
            },

            login: function() {
                var that = $injector.get('youtubeFactory');
                if (!this.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('google apis not loaded, cant login');
                    return;
                }

                that.handleAuthResult = function (authResult) {
                    if (authResult && !authResult.error) {
                        $('.pre-auth').hide();
                        $('.post-auth').show();
                        console.log('OAUTH DONE');
                        that.loggedInAsGoogleUser = true;
                        // now to see what we get with the authResult...
                        console.log(authResult);
                    } else {
                        console.log('OAUTH NOT DONE');
                    }
                };

                that.checkAuth = function(){
                    gapi.auth.authorize({
                        client_id: that.OAUTH2_CLIENTID,
                        scope: that.OAUTH2_SCOPE,
                        immediate: false
                    }, that.handleAuthResult);
                };
                gapi.auth.init(function() {
                window.setTimeout(that.checkAuth, 1);
                });

            },

            /**
             * run a video search on YouTube and make the response available in the callback
             */
            search: function(queryPhrase, callback){
                var that = $injector.get('youtubeFactory');
                if (!this.readyForAction){
                    // if we're not ready, don't do nothing
                    console.log('google apis not loaded, cant search');
                    return;
                }

                // init queryParams for the search
                var queryParams = { part: 'snippet' , type: 'video' , maxResults: this.resultsMax }

                if (queryPhrase) {
                    queryParams.q = queryPhrase;
                }

                if (this.lastSearch !== queryPhrase){
                    this.lastSearch = queryPhrase;
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
                if (!this.readyForAction){
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
            }
            ,

            moarFunc: function(){
//                obj = {};

                if (obj && obj.value > 0 && obj.value <10){
//                if (num > 0 && num < 10){
//                    console.log('result is negative');
//                    console.log('result is zero');
//                    console.log('result is pozitive');
//                    console.log('result is smaller than 10');
//                    console.log('result is larger than 10');
                    console.log ('goodness');
                } else {
                    console.log ('badness');
                }
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
