var myTubeApp = angular.module('myTubeApp',['ngRoute','ngAnimate']);
myTubeApp.config(function($routeProvider) { 
    $routeProvider
        .when('/home', {
            controller: 'homePageController',
            templateUrl: 'app/views/homepage.html'
        })
        .when('/like', {
            controller: 'likevidsController',
            templateUrl: 'app/views/likevids.html'
        })
        .when('/new', {
            controller: 'newVidsController',
            templateUrl: 'app/views/newvids.html'
        })
        .when('/history', {
            controller: 'historyController',
            templateUrl: 'app/views/history.html'
        })
        .when('/subscriptions', {
            controller: 'subscriptionsController',
            templateUrl: 'app/views/subscriptions.html'
        })
        .otherwise( {redirectTo: '/home' });
    
});
myTubeApp.run(function(youtubeFactory){
    youtubeFactory.init();
});
    

