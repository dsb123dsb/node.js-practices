const http =require('http');
const cheerio = require('cheerio');
const url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	// [{
	// 	chapterTitle: '',
	// 	videos: {
	// 		title: '',
	// 		id: ''
	// 	}
	// }]
	var courseData = [];
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
		courseData.push(chapterData);
	});
	return courseData;
}
function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + '\n');

		item.videos.forEach(function(video){
			// console.log(`【${video.id}】 ${video.title}\n`);
			console.log('   【' + video.id + '】 ' + video.title + '\n');
		});
	});
}

http.get(url, function(res){
	var html = '';
	 res.on('data', function(data){
	 	html +=data;
	 });
	 res.on('end', function(){
	 	// 过滤信息
	 	var courseData = filterChapters(html);
	 	printCourseInfo(courseData);
	 });
}).on('error', function(){
	console.log('获取课程数出错');
});

