// 返回一个class（ES6）
const EventEmitter = require('events');

console.log(EventEmitter);

const life = new EventEmitter();

life.setMaxListeners(11);// 设置事件最大监听的最大极限

// addEventListener
var water = (who) => {
	console.log(`给 ${who} 倒水`);
};
life.on('求安慰', water);

life.on('求安慰', (who) => {
	console.log(`给 ${who} 捶背`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 揉肩`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 洗脚`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。5`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。6`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。7`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。8`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。9`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 。。。10`);
});

life.on('求安慰', (who) => {
	console.log(`给 ${who} 你想累死我啊`);
});

life.on('求溺爱', (who) => {
	console.log(`给 ${who} 买衣衣`);
});

life.on('求溺爱', (who) => {
	console.log(`给 ${who} 交公粮`);
});

//移除监听事件函数
life.removeListener('求安慰', water);
//批量移除
life.removeAllListeners('求安慰');

// 返回布尔值，表示事件是否被监听
var hasConfortListener = life.emit('求安慰', '汉纸');
var hasLoveListener = life.emit('求溺爱', '妹子');
var hasPlayedListener = life.emit('求玩坏', '汉纸和妹子');

// 返回事件监听函数(数组)、数量
console.log(life.listeners('求安慰').length);
console.log(life.listeners('求溺爱').length);
console.log(EventEmitter.listenerCount(life, '求安慰'));

console.log(hasPlayedListener);
console.log(hasLoveListener);
console.log(hasConfortListener);