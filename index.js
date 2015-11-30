var app = angular.module('urss-reader', []);

app.controller("feedsDrawer", ['$scope','FeedService', function ($scope,Feed) {    
   	$scope.feeds = [{name:"korben", url:"http://korben.info/rss"}, 
   					{name:"tuxicoman", url:"https://tuxicoman.jesuislibre.net/feed"},
   					{name:"HackerNews", url:"https://news.ycombinator.com/rss"}
   					];
 	$scope.selectedFeed = "";
 	$scope.articles = [];


    $scope.loadFeed=function(e, url){
    	$scope.selectedFeed = url;        
        Feed.parseFeed($scope.selectedFeed).then(function(res){
        	console.log("afterParse :"+res.data.responseData.feed.entries);
            $scope.articles=res.data.responseData.feed.entries;
        });
        console.log("Scope.articles = "+$scope.articles[0]);
    }

    $scope.loadAllFeeds=function(e){
    	$scope.articles = [];
    	angular.forEach($scope.feeds, function(feed) {
    		Feed.parseFeed(feed.url).then(function(res){
    			var articles = res.data.responseData.feed.entries;
    			angular.forEach(articles, function(article) {
    				$scope.articles.push(article);
    			})
    			console.log(res.data.responseData.feed.entries);
    		});
    	});
    }

 	$scope.loadFeed(null, $scope.feeds[0].url);
}]);

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
        	console.log("Parsing :"+url);
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

