var config_url = "http://lp1.eu/public/uRSS-Reader/config.json"
var app = angular.module('urss-reader', []);

app.controller("feedsDrawer", ['$scope','FeedService','$http', function ($scope,Feed,$http) {
    $scope.feeds = [{name:"korben", url:"http://korben.info/rss"}];
    $http.get(config_url).then(function(res){
        $scope.config = res.data;
        console.log("config="+$scope.config);
        $scope.feeds = $scope.config.feeds;
        if ($scope.feeds.length > 0){
          $scope.loadFeed(null, $scope.feeds[0].url);
          $scope.pageTitle = $scope.feeds[0].name;
      }
  }, function(error){console.log("Config file unreachable")});
    $scope.articles = [];
    $scope.displayMode = false;

    $scope.displayArticle=function(e, article){
        $scope.selectedArticle = article;
        $scope.pageTitle = $scope.selectedArticle.author + " - " +$scope.selectedArticle.title;
        $scope.displayMode = true;
    }

    $scope.hideArticle=function(e){
        $scope.displayMode = false;
        $scope.pageTitle = $scope.selectedFeed.name;
    }

    $scope.loadFeed=function(e, feed){
        $scope.displayMode = false;
    	$scope.selectedFeed = feed;        
        Feed.parseFeed($scope.selectedFeed.url).then(function(res){
            $scope.pageTitle = $scope.selectedFeed.name;
            $scope.articles=res.data.responseData.feed.entries;
        });
    }

    $scope.loadAllFeeds=function(e){
    	$scope.articles = [];
    	angular.forEach($scope.feeds, function(feed) {
    		Feed.parseFeed(feed.url).then(function(res){
    			var articles = res.data.responseData.feed.entries;
    			angular.forEach(articles, function(article) {
    				$scope.articles.push(article);
    			})
    		});
    	});
    }

}]);

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

