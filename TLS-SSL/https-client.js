const https = require('https');
const fs = require('fs');
const options = {
	hostname: 'localhost',
	port: 8000,
	path: '/',
	method: 'GET',
	key: fs.readFileSync('client.key'),
	cert: fs.readFileSync('client.crt'),
	ca: [fs.readFileSync('ca.crt')]
};
options.agent=new https.Agent(options);
const req = https.request(options, (res) => {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', (chunk) => {
		console.log(chunk);
	});
});
req.end();
req.on('error',(e)=>{
	console.log(e);
});