const cluster = require('cluster');
 // 内部创建tcp，可共享资源描述符，
cluster.setupMaster({
	exec:'worker.js'
});

let cpus = require('os').cpus();
for(let i =0; i<cpus.length; i++){
	cluster.fork();// 创建子进程可监听同一端口
}