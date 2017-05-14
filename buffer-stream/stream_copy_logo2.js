
const fs = require('fs');
const readStream = fs.createReadStream('./1.JPG');
const writeStream = fs.createWriteStream('1-stream.JPG');

readStream.on('data', (chunk) => {
	// 读入文件是否写入目标位置
	if(writeStream.write(chunk) === false){
		// 写入太慢，读入文件还在缓存区
		console.log('still cached');
		readStream.pause();
	}
});

readStream.on('end', () => {
	writeStream.end();
});

// 缓存区的读入文件已经全部写入目标位置
writeStream.on('drain', () => {
	console.log('data drains');

	readStream.resume();
})
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