const http = require('http');
const sessions = {};
const key = 'session.id';
const Expires = 20 * 60 * 1000;
http.createServer((req, res) => {
	req.cookies = parseCookie(req.headers.cookie); //解析cookie并挂载在req上
	const id = req.cookies[key];
	if (!id) {
		req.session = generate();
	} else {
		var session = sessions[id];
		if (session) {
			//更新超时时间
			if (session.cookie.expire > (new Date()).getTime()) {
				session.cookie.expire = (new Date()).getTime() + Expires;
				req.session = session;
			} else {
				//超时了，删除旧的数据并重新生成
				delete sessions[id];
				req.session = generate();
			}
		} else {
			//如果session过期或者口令不对，重新生成
			req.session = generate();
		};
	};
	handle(req, res); //开展业务代码
}).listen(1338, '127.0.0.1');
//生成session
const generate = () => {
	const session = {};
	session.id = (new Date()).getTime() + Math.random();
	session.cookie = {
		expire: (new Date()).getTime() + Expires
	};
	sessions[session.id] = session;
	return session;
};
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
	//hack writeHead()
	const writeHead = res.writeHead;
	res.writeHead = () => {
		var cookies = res.getHeader('Set_Cookie');
		var session = serialize('Set_Cookie', req.session.id);
		cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
		res.setHeader('Set_Cookie', cookies);
		return writeHead.apply(this, arguments);
	}
	if (!req.session.isVisit) {
		res.session.isVisit = true;//此处报错，不能设置未定义变量
		res.writeHead(200);
		res.end("欢迎第一次来到动物园!");
	} else {
		res.writeHead(200);
		res.end('动物园再次欢迎你');
	}
};
//写入响应Set-cookie
const serialize = (name, val, opt) => {
	const pairs = [name + '=' + encodeURI(val)];
	opt = opt || {};
	if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
	if (opt.domian) pairs.push('Domain=' + opt.domain);
	if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
	if (opt.secure) pairs.push('Secure');
	return pairs.join(';');
};
console.log('Server running at http://127.0.0.1/');