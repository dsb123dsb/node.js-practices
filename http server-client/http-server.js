const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log(req.headers); //打印其余报头
	const buffers = [];
	req.on('data', (trunk) => {
		buffers.push(trunk);
	}).on('end', () => {
		const buffer = Buffer.concat(buffers);
		res.statusCode = 200;
		res.writeHead('Content-Type', 'text/plain');
		res.end('Hello World\n');
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
