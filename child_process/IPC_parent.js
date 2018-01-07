const cp = require('child_process');
// 绝对路径
const n = cp.fork(__dirname+'/IPC_sub.js');
const n1 = cp.fork(__dirname+'/IPC_sub.js');
const server = require('net').createServer();

server.on('connection',(socket)=>{
	socket.end('handled by parent\n');
});
server.listen(1337, ()=>{
	n.send('server', server);
	n1.send('server', server);
	server.close();
})

// n.on('message', (m)=>{
// 	console.log('PARENT got message:',m);
// });
// n.send({hello:'world'});