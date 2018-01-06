const cp = require('child_process');
/*
妈的。前三个不打印东西啊，日
 */
cp.spawn('node', ['./worker.js']);
cp.exec('node worker.js', (err, stdout, stderr)=>{console.log('running')});
cp.execFile('node', ['./worker.js'],(err, stdout, stderr)=>{
	    if(err){
        throw error;
    }
    console.log(stdout);
});
cp.fork('./worker.js');