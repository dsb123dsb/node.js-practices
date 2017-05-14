
const fs = require('fs');
const readStream = fs.createReadStream('stream_copy_logo.js');
var n =0;
// 边读边写

readStream
	.on('data', (chunk) => {
		n++;
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		console.log(chunk.toString('utf8'));
		// 每次读取一部分，然后下一部分，文件大的话会暂停多次，一次读不完（就算不暂停，也不是一次读完的）
		readStream.pause();
		console.log('data pause');
		setTimeout(function() {
			console.log('data pause end');
			readStream.resume();
		}, 3000);
	})
	.on('readable', () => {
		console.log('data readable');
	})
	.on('end', () => {
		console.log('n: ', n);
		console.log('data end');
	})
	.on('close', () => {
		console.log('data close');
	})
	.on('error', (e) => {
		console.log('data read error'+ e);
	});
	
// fs.writeFileSync('stream_copy_image.png', source);

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