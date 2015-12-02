var config_url = "http://lp1.eu/projects/uRSS-Reader/config.json";
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
	    $scope.articles[i].date = new Date(article.pubDate);
	    $scope.articles[i].dateString = new Date($scope.articles[i].date).toUTCString();
	    });
    }

    $scope.setAuthor=function(articles, feed)
    {
	angular.forEach(articles, function(article, i){
	    articles[i].author = feed;
	});
	return articles;
    }

    $scope.loadFeed=function(e, feed){
        $scope.displayMode = false;
    	$scope.selectedFeed = feed;
        $scope.pageTitle = "Loading...";
        Feed.parseFeed($scope.selectedFeed.url).then(function(res){
            $scope.pageTitle = $scope.selectedFeed.name;
            $scope.articles = $scope.setAuthor(res.data.rss.channel.item, $scope.selectedFeed.name);
    	    $scope.parseDates();
	    $scope.selectedFeed.img = res.data.rss.channel.image.url;
            closeDrawer();
        });
    }

    $scope.loadAllFeeds=function(e){
    	$scope.articles = [];
        $scope.pageTitle = "Loading...";
    	angular.forEach($scope.feeds, function(feed) {
    	    Feed.parseFeed(feed.url).then(function(res){
		$scope.pageTitle = "All"
		console.log(res.data);
    		var articles = $scope.setAuthor(res.data.rss.channel.item, feed.name);
    		angular.forEach(articles, function(article) {
    		    $scope.articles.push(article);
    		});
		$scope.parseDates();
    	    });
    	});
    }

}]);

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.get('http://lp1.eu:8001/?feed='+url);
        }
    }
}]);
