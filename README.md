# uRSS-Reader

uRSS Is a super slim and fast RSS Feeds Reader written in AngularJS and JavaScript with HTML/CSS design

# How to use it ?

To deploy uRSS-Reader you need to have a web server and make the files available from the device you want to access your feeds.

##First edit the config.json file

There is an example JSON config file available on the repository like this one : 

`{"feeds":[{"name":"korben","url":"http://korben.info/rss"},{"name":"tuxicoman", "url":"https://tuxicoman.jesuislibre.net/feed"},{"name":"HackerNews", "url":"https://news.ycombinator.com/rss"}]}`

##Change the url pointing to this file in reader.js

Once you created your *config.json* file and it is available on your web server don't forget to replace its url in the *reader.js* file.

***The AngularJs client needs to be able to access your config.json file, think about the CORS headers***

