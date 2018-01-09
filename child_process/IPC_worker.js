let http = require('http');
let server = http.createServer((req,res)=>{ // 转化http层
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end('handled by child, pid is ' + process.pid+'\n');
	// 测试访问报错终止进程重启
	throw new Error('throw exception');
});
let worker;
process.on('message',(m,tcp)=>{
	console.log('CHILD got message:',m);
	if(m='server'){
		worker=tcp;
		worker.on('connection', (socket)=>{
			// console.log('where I am ?') // 这里打印无意义
			// socket.end('handled by tcp, pid is '+ process.pid+'\n');
			server.emit('connection',socket); // 接受句柄同时tcp连接时，http触发connection事件
			// socket.end('handled by child, pid is '+ process.pid+'\n'); //tcp传递句柄后已关闭
		});
	}
});
process.on('uncaughtException', (err)=>{
	//停止接收新的连接
	process.send({act:'suicide'}); // 发送自杀信号
	worker.close(()=>{
		//断开所有连接
		process.exit(1);
	});
})
// process.on('SIMTERM', ()=>{
// 	console.log('Got a SIGTERM, exiting...');
// 	process.exit(1);
// })
// process.kill(process.pid, 'SIGTERM'); // 杀死子进程
// process.send({foo:'bar'});