// 1.推荐写法，封装更好，可读性和可维护性，感觉不到主进程存在服务器相关代码
const cluster = require('cluster');
 // 内部创建tcp，可共享资源描述符，
cluster.setupMaster({
	exec:'worker.js'
});

let cpus = require('os').cpus();
for(let i =0; i<cpus.length; i++){
	cluster.fork();// 创建子进程可监听同一端口
}

// 2. 官网一般写法
/*const cluster = require('cluster');
const http = require('http');
let numCPus = require('os').cpus().length;

if(cluster.isMaster){
	// fork workers
	for(let i = 0 ;i<numCPus; i++){
		cluster.fork();
	}
	cluster.on('exit', (work, code, signal)=>{
		console.log('worker ' + work.process.pid+' died');
	});
}else{
	// Workers can share any TCP connection
	http.createServer((req,res)=>{
		res.writeHead(200);
		res.end("hello world\n"+'I am from '+process.pid);
	}).listen(8000);
	console.log('Worker is created, The pid is'+process.pid);
};*/