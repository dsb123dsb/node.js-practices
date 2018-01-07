const cp = require('child_process');
// 绝对路径
const n = cp.fork(__dirname+'/postMessage_sub.js');

n.on('message', (m)=>{
	console.log('PARENT got message:',m);
});
n.send({hello:'world'});