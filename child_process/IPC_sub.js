const http = require('http');
const server = http.createServer((req,res)=>{ // 转化http层
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end('handled by child, pid is ' + process.pid+'\n');
});
process.on('message',(m,tcp)=>{
	console.log('CHILD got message:',m);
	if(m='server'){
		tcp.on('connection', (socket)=>{
			// console.log('where I am ?') // 这里打印无意义
			// socket.end('handled by tcp, pid is '+ process.pid+'\n');
			server.emit('connection',socket); // 接受句柄同时tcp连接时，http触发connection事件
			// socket.end('handled by child, pid is '+ process.pid+'\n'); //tcp传递句柄后已关闭
		});
	}
});
// process.send({foo:'bar'});