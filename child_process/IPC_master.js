let cpus = require('os').cpus();
// 绝对路径
let fork = require('child_process').fork;
let server = require('net').createServer();

server.on('connection',(socket)=>{
	socket.end('handled by parent\n');
});
server.listen(1337, ()=>{
	// server.close(); //关闭tcp时，杀死子进程会导致不断重启 
})

// 复制进程并发送句柄,设置自动重启
let workers = {}; // 存放进程
let createWorker = ()=>{
	let worker = fork(__dirname+'/IPC_worker.js');
	worker.on('message',(message)=>{
		// console.log(message)
		if(message.act==='suicide'){
			createWorker();
		}
	});
	// 退出时重启新的进程
	worker.on('exit', ()=>{
		console.log('Worker '+ worker.pid + ' exited');
		delete workers[worker.pid];
		// createWorker();
	});
	// 句柄转发
	worker.send('server', server);
	workers[worker.pid]=worker;
	console.log('Create worker. pid: '+worker.pid);
};

for(let i = 0; i<cpus.length; i++){
	createWorker();
}

// 主进程自己退出时，让所有工作进程退出
process.on('exit', ()=>{
	for(let pid in workers){
		workersp[pid].kill()
	}
})
// n.kill('SIGTERM'); // 杀死子进程

// n.on('message', (m)=>{
// 	console.log('PARENT got message:',m);
// });
// n.send({hello:'world'});