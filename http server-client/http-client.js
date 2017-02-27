const http = require('http');
const optiins={
	hostname:'127.0.0.1',
	port:3000,
	path:'/',
	method:'GET'
};
const req=http.request(optiins,(res)=>{
	console.log('STATUS: '+res.statusCode);
	console.log('HEADERS: '+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data',(chunk)=>{
		console.log(chunk);
	});
});
req.end();