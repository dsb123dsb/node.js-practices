const http = require('http');
http.createServer((req, res) => {
	req.cookies = parseCookie(req.headers.cookie); //解析cookie并挂载在req上
	handle(req, res); //开展业务代码
}).listen(1337, '127.0.0.1');
//解析cookie在req.headers.cookie
const parseCookie = (cookie) => {
	const cookies = {};
	if (!cookie) {
		return cookies;
	}
	const list = cookie.split(';');
	for (var i = 0; i < list.length; i++) {
		var pair = list[i].split('=');
		cookies[pair[0].trim()] = pair[1];
	}
	return cookies;
};
//业务代码
const handle = (req, res) => {
	if (!req.cookies.isVisit) {
		res.setHeader('Set-cookie', serialize('isVisit', 1));
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end("欢迎第一次来到动物园!");
	}else{
		res.writeHead(200);
		res.end('动物园再次欢迎你');
	}

};
//写入响应Set-cookie
const serialize=(name,val,opt)=>{
	const pairs=[name+'='+encodeURI(val)];
	opt=opt||{};
	if(opt.maxAge)pairs.push('Max-Age='+opt.maxAge);
	if(opt.domian)pairs.push('Domain='+opt.domain);
	if(opt.expires)pairs.push('Expires='+opt.expires.toUTCString());
	if(opt.secure)pairs.push('Secure');
	return pairs.join(';');
};
console.log('Server running at http://127.0.0.1/');