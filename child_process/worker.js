#!/usr/bin/env node
const http = require('http');
let port = Math.round((1+Math.random())*1000);
http.createServer((req, res)=>{
	res.writeHead(200, {'Content-Type': 'Text/plain'});
	res.end('Hello world\n');
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:'+port);