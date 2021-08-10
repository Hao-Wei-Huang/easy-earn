# Easy Earn

## Introduction 

Easy Earn is a website for Taiwan stock screener. The stocks can be screened by the conditions of technical, chip,and fundamental side. Save much time to search the stocks. Furthermore, Easy Earn has single stock analysis that analyze advantage items. And add email notification function, the users can 
be notified immediately the stocks screened by condition list after the stock market closing.

## Features

* Member login and signup
* Stock screener
* Screened stock list
* Single stock information
* Single stock analysis
* Tracked stock list
* Email notification

## Technologies
* Vue.js development
* Vue CLI 3 plan SPA framework.
* Vue Router
* Bootstrap 4 + SCSS
* Use axios to connect the RESTful API of the backend.
* Use C3.js to draw chart.

## System

The screened stock system is composed of website, web server, and stock reptile.

* Website is the current repository(Easy Earn).
* Web server is the [tw-stock-api](https://github.com/Hao-Wei-Huang/tw-stock-api).
* Stock reptile is the [tw-stock-reptile](https://github.com/Hao-Wei-Huang/tw-stock-reptile).

![](https://i.imgur.com/hj8vX0w.png)
<br>
system architecture diagram

## Notes
1. The website only provides stock screening and stock information query functions, moreover there is no intention to recommend stocks. Please evaluate carefully.
2. The data source of the website is from [台灣證券交易所](https://www.twse.com.tw/zh/), [櫃檯買賣中心](https://www.tpex.org.tw/web/index.php?l=zh-tw) ,and [公開資訊觀測站](https://mops.twse.com.tw/mops/web/index).
3. The screened stock interface on this website refer to [財報狗](https://statementdog.com/). It is only used as an exercise and does't have any profit.