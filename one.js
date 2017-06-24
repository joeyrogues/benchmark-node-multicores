
const http = require('http');


const PORT = 8000












	http.createServer((req, res) => {
		for(let i = 0 ; i < 10000 ; i++) {
			console.log(i)
		}
		res.writeHead(200);
		res.end(new Date().toISOString());
	}).listen(PORT);

	console.log(`Master ${process.pid} started`);