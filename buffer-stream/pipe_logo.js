// const http = require('http');
const fs = require('fs');
// const request = require('request');
fs.createReadStream('./1.JPG').pipe(fs.createWriteStream("1-pipe.JPG"));


// http
// 	.createServer((req, res) => {
// 		// 1. 非流方式
// 		// fs.readFile('./logo.png', (err, data) => {
// 		// 	if(err) {
// 		// 		res.end('file not exist');
// 		// 	}else{
// 		// 		res.writeHeader(200, {'Content-Type': 'text/html'});
// 		// 		res.end(data);
// 		// 	}
// 		// });
// 		// 2. 留pipe
// 		// 2.1 读取本地
// 		// fs.createReadStream('./logo.png').pipe(res)
// 		//2.2 读取网络
// 		request('http://static.mukewang.com/static/img/common/logo.png?t=2.3')
// 			.pipe(res);
// 	})
// 	.listen(8090);

// readStream.on('data', (chunk) => {
// 	// 读入文件是否写入目标位置
// 	if(writeStream.write(chunk) === false){
// 		// 写入太慢，读入文件还在缓存区
// 		console.log('still cached');
// 		readStream.pause();
// 	}
// });

// readStream.on('end', () => {
// 	writeStream.end();
// });

// // 缓存区的读入文件已经全部写入目标位置
// writeStream.on('drain', () => {
// 	console.log('data drains');

// 	readStream.resume();
// })


// fs.readFile('logo.png', (err, origin_buffer) => {
// 	console.log(Buffer.isBuffer(origin_buffer));

// 	fs.writeFile('logo_buffer.png', origin_buffer, (err) => {
// 		if(err)console.log(err);
// 	});

// 	// var base64Image = new Buffer(origin_buffer).toString('base64');
// 	var base64Image = origin_buffer.toString('base64');

// 	console.log(base64Image);

// 	var decodedImage = new Buffer(base64Image, 'base64');

// 	console.log(Buffer.compare(origin_buffer, decodedImage));

// 	fs.writeFile('logo_decoded.png', decodedImage, (err) => {
// 		if(err) console.log(err);
// 	})
// });