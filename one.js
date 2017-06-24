
const http = require('http');


const PORT = 8000












	http.createServer((req, res) => {
		let a = 0
  	for(let i = 0 ; i < 100000000 ; i++) {
  		a = a + i
  	}
		res.writeHead(200);
		res.end(new Date().toISOString());
	}).listen(PORT);

	console.log(`Master ${process.pid} started`);