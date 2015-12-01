var config_url = "http://lp1.eu/public/uRSS-Reader/config.json"
var app = angular.module('urss-reader', ['ngSanitize']);

app.controller("feedsController", ['$scope','FeedService','$http', function ($scope,Feed,$http) {
    $scope.feeds = [{name:"korben",url:"http://korben.info/rss"}];
    $http.get(config_url).then(
	function(res){
            $scope.config = res.data;
            console.log("config="+$scope.config);
            $scope.feeds = $scope.config.feeds;
            if ($scope.feeds.length > 0)
		$scope.loadAllFeeds(null);
	}
	,function(error){console.log("Config file unreachable")});
    $scope.articles = [];
    $scope.displayMode = false;

    $scope.displayArticle=function(e, article){
        $scope.selectedArticle = article;
        $scope.pageTitle = $scope.selectedArticle.author + " - " +$scope.selectedArticle.title;
	$scope.htmlContent = $scope.selectedArticle.content;
        $scope.displayMode = true;
    }

    $scope.hideArticle=function(e){
        $scope.displayMode = false;
	if ($scope.selectedFeed != null)
            $scope.pageTitle = $scope.selectedFeed.name;
	else
	    $scope.pageTitle = "All";
    }

    $scope.parseDates=function(){
	angular.forEach($scope.articles, function(article, i){
	    $scope.articles[i].date = new Date(article.publishedDate);
	    $scope.articles[i].dateString = new Date($scope.articles[i].date).toUTCString();
	    });
    }

    $scope.loadFeed=function(e, feed){
        $scope.displayMode = false;
    	$scope.selectedFeed = feed;        
        Feed.parseFeed($scope.selectedFeed.url).then(function(res){
            $scope.pageTitle = $scope.selectedFeed.name;
            $scope.articles=res.data.responseData.feed.entries;
            closeDrawer();
    	    $scope.parseDates();
        });
    }

    $scope.loadAllFeeds=function(e){
    	$scope.articles = [];
	$scope.pageTitle = "All";
    	angular.forEach($scope.feeds, function(feed) {
    	    Feed.parseFeed(feed.url).then(function(res){
    		var articles = res.data.responseData.feed.entries;
    		angular.forEach(articles, function(article) {
    		    $scope.articles.push(article);
    		});
		$scope.parseDates();
        closeDrawer();
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
