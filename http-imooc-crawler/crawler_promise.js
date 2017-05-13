const http =require('http');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const baseUrl = 'http://www.imooc.com/learn/';
// const url = 'http://www.imooc.com/learn/348';
const videoId = [348, 259, 197, 134, 75, 728, 637];

function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	var title = $('.course-infos .hd .l').text().trim();
	var number = $('.course-infos .statics .js-learn-num').text().trim();
	// courseData={
	// 	title: title,
	// 	number: bumber,
	// 	videos:[{
	// 		chapterTitle: '',
	// 		videos: {
	// 			title: '',
	// 			id: ''
	// 		}
	// 		}]
	// };
	var courseData = {
		title: title,
		number: number+"不让爬学习人数",
		videos: []
	};
	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text().trim();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}

		videos.each(function(item){
			var video = $(this).find('.J-media-item');
			var videTitle = video.text().trim();
			var id = video.attr('href').split('video/')[1];

			chapterData.videos.push({
				title:videTitle,
				id: id
			});
		});
		courseData.videos.push(chapterData);
	});
	return courseData;
}
function printCourseInfo(coursesData){
	coursesData.forEach((courseData) => {
		console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
	});

	coursesData.forEach(function(courseData){
		console.log('### ' + courseData.title + '\n');
		courseData.videos.forEach((item) => {
			var chapterTitle = item.chapterTitle;

			console.log(chapterTitle + '\n');

			item.videos.forEach(function(video){
				// console.log(`【${video.id}】 ${video.title}\n`);
				console.log('   【' + video.id + '】 ' + video.title + '\n');
			});			
		});
	});
}

function getPageAsync(url){
	return new Promise((resolve, reject) => {
		console.log('正在爬取 ' + url);

		http.get(url, function(res){
			var html = '';
			 res.on('data', function(data){
			 	html +=data;
			 });
			 res.on('end', function(){
			 	resolve(html);
			 	// 过滤信息
			 	// var courseData = filterChapters(html);
			 	// printCourseInfo(courseData);
			 });
		}).on('error', function(e){
			reject(e);
			console.log('获取课程数出错');
		});
	});
}

var fetchCourseArray = [];// Promise 数组

videoId.forEach((id) => {
	fetchCourseArray.push(getPageAsync(baseUrl + id));
});
// all()返回值组成一个数组，传递给then回调函数
Promise
	.all(fetchCourseArray)
	.then((pages) => {
		var coursesData = [];
		pages.forEach((html) => {
			var course = filterChapters(html);

			coursesData.push(course);
		});

		coursesData.sort((a, b) => {
			return a.number<b.number;
		});
		printCourseInfo(coursesData);
	})
