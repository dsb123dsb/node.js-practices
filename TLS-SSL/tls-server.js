const tls=require('tls');
const fs=require('fs');

const options={
	key:fs.readFileSync('server.key'),
	cert:fs.readFileSync('server.crt'),
	requestCert:true,
	ca:[fs.readFileSync('ca.crt')]
};
const server=tls.createServer(options,(stream)=>{
	console.log('server connected',stream.authorized?'authorized':'unauthorized');
	stream.write('welcome!');
	stream.setEncoding('utf8');
	stream.pipe(stream);
});
server.listen(8000,()=>{
	console.log('server bound!');
})