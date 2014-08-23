var myTubeApp = angular.module('myTubeApp',['ngRoute','ngAnimate']);
myTubeApp.config(function($routeProvider) { 
    $routeProvider
        .when('/home', {
            controller: 'homePageController',
            templateUrl: 'app/views/homepage.html'
        })
        .when('/like', {
            controller: 'likeVidsController',
            templateUrl: 'app/views/likevids.html'
        })
        .when('/search', {
            controller: 'searchVidsController',
            templateUrl: 'app/views/searchvids.html'
        })
        .when('/playlists', {
            controller: 'playlistsController',
            templateUrl: 'app/views/playlists.html'
        })
        .when('/subscriptions', {
            controller: 'subscriptionsController',
            templateUrl: 'app/views/subscriptions.html'
        })
        .otherwise( {redirectTo: '/home' });
    
});

//Initializing communications with YouTube Data API V3
myTubeApp.run(function(googleAuthFactory){
    googleAuthFactory.init();
});
    

