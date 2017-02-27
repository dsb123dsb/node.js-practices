const tls=require('tls');
const fs=require('fs');

const options={
	key:fs.readFileSync('client.key'),
	cert:fs.readFileSync('client.crt'),
	ca:[fs.readFileSync('ca.crt')]
};
const stream=tls.connect(8000,options,(stream)=>{
	console.log('client connected',stream.authorized?'authorized':'unauthorized');
	process.stdin.pipe(stream);
});
	stream.setEncoding('utf8');
	stream.on('data',(data)=>{
		console.log(data);
	});
	stream.on('end',()=>{
		server.close();
	});
