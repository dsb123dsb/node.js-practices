// g灌水评论
const http = require('http');
const querystring = require('querystring');

var postData = querystring.stringify({
	'content': '测试你懂的，哈哈哈',
	'cid': 348
});

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.8',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=8bb6f7b0-d6a6-47a2-b664-4d1b3a2cc21a; imooc_isnew_ct=1492090896; loginstate=1; apsid=A4MjE2ODUwZDAxZDFjZTNiZmNiYmE0ZWUzNzM5MjcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTMwMDMyOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1MjM1OTg0MzhAcXEuY29tAAAAAAAAAAAAAAAAAAAAADYxNDkwZTQ2YTZiNjJkODMzMjFmYmYwOTYyMWFmODBmLUoTWS1KE1k%3DND; last_login_username=523598438%40qq.com; UM_distinctid=15bf35c3f5e528-0c221e17c3c267-871123a-1fa400-15bf35c3f5fa; CNZZDATA1261110065=1426014172-1494431296-null%7C1494431296; mc_channel=ztsina; mc_marking=67d6aa8c5e0280f4bb1184c13f8b8473; PHPSESSID=qik3hon8g6t20t52e4mbcm6lf7; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1494436238,1494436561,1494484943,1494567985; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1494578923; imooc_isnew=2; cvde=59154c7526f03-90',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Referer': 'http://www.imooc.com/comment/348',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
};

var req = http.request(options, function(res){
	console.log('Status: ' + res.statusCode);
	console.log('header: ' + JSON.stringify(res.headers));

	res.on('data', function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk, chunk.toString());
	});

	res.on('end', function(){
		console.log('评论完毕！');
	});
});

req.on('error', function(e){
	console.log("Error: "+ e.message);
});

req.write(postData);
req.end();