const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const PORT = 8001

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    let a = 0
  	for(let i = 0 ; i < 100000000 ; i++) {
  		a = a + i
  	}
		res.writeHead(200);
  	res.end(new Date().toISOString());
  }).listen(PORT);

  console.log(`Worker ${process.pid} started`);
}