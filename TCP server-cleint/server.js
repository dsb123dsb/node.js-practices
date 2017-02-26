const net = require('net');

var server=net.createServer(function(socket){
	//新连接
	socket.on('data', function(data) {
		socket.write("你好！");
		/* Act on the event */
	});
		socket.on('end', function(data) {
		console.log("断开链接");
		/* Act on the event */
	});
		socket.write("欢迎光临《深入浅出node.js》 示例：\n");
});
server.listen(8124,  function() {
  console.log("server bound");
});