var googleAuthFactory = function ($injector, $timeout) {

    return {
        API_KEY: 'AIzaSyAnSABpTcJtt9tDfOVFKl6j1PPuWFmKSqQ',
        OAUTH2_CLIENTID: '43179681697-hb5mkrhms4a09o8gsddh6627ldcbedmv.apps.googleusercontent.com',
        OAUTH2_SCOPE: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/userinfo.profile'],
        readyForAction: false,
        readyForLogin: false,
        loggedInAsGoogleUser: false,

        init: function () {
            // since this function is called as a callback, we'll need "this" to really be the factory
            var that = $injector.get('googleAuthFactory');
            if (typeof gapi.client == 'undefined' || typeof gapi.auth == 'undefined') {
                console.log('google apis not loaded yet...');
                // if not ready yet, try again in half a second
                $timeout(that.init, 500);
            } else {
                console.log('google apis LOADED!');
                gapi.client.setApiKey(that.API_KEY);
                that.readyForLogin = true;
                $timeout(that.implicitLogin, 1);
            }
        },


        implicitLogin: function () {
            // since this function is called as a callback, we'll need "this" to really be the factory
            var that = $injector.get('googleAuthFactory');

            if (!that.readyForLogin) {
                // if we're not ready, don't do nothing
                console.log('google auth not loaded, cant login');
                return;
            }

            gapi.auth.authorize({
                client_id: that.OAUTH2_CLIENTID,
                scope: that.OAUTH2_SCOPE,
                immediate: true
            }, that.handleAuthResult);
        },

        handleAuthResult: function (authResult) {
            var that = $injector.get('googleAuthFactory');
            if (authResult && !authResult.error) {
                $('.pre-auth').hide();
                $('.post-auth').show();
                console.log('OAUTH DONE');
                console.log('TOKEN: ' + authResult.access_token );
                that.loggedInAsGoogleUser = true;
                gapi.client.load('oauth2','v2',function(){
                    gapi.client.oauth2.userinfo.get().execute(function(resp){
                        that.username = resp.name;
                        that.userPicture = resp.picture;
                    });
                });
            } else {
                $('.pre-auth').show();
                $('.post-auth').hide();
                console.log('OAUTH NOT DONE');
                that.loggedInAsGoogleUser = false;
            }

            gapi.client.load('youtube', 'v3', function () {
                // NOW we're actually ready to use the YouTube API
                that.readyForAction = true;
            });
        },

        login: function () {
            var that = $injector.get('googleAuthFactory');

            if (!that.readyForLogin) {
                // if we're not ready, don't do nothing
                console.log('google auth not loaded, cant login');
                return;
            }

            gapi.auth.authorize({
                client_id: that.OAUTH2_CLIENTID,
                scope: that.OAUTH2_SCOPE,
                immediate: false
            }, that.handleAuthResult);
        }
    }
};

angular.module('myTubeApp').factory('googleAuthFactory', googleAuthFactory);

