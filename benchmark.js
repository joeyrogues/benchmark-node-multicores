const http = require('request-promise')

REQUEST_COUNT = process.env.REQUEST_COUNT

const QUERY_COUNT = REQUEST_COUNT && +(REQUEST_COUNT) || 20

let generateDummyRequest = function ({port}) {
	return http({
	  method: 'POST',
	  uri: `http://127.0.0.1:${port}/foo`,
	  json: true
	})
}

// Preparing the promises, not firing yet
let arrayOrPromises_one = new Array(QUERY_COUNT)
	.fill(() => generateDummyRequest({port: 8000}))

let arrayOrPromises_many = new Array(QUERY_COUNT)
	.fill(() => generateDummyRequest({port: 8001}))

setTimeout(() => {

	// Firing the one core requests
	var t1 = Date.now()
	Promise.all(arrayOrPromises_one.map(e => e())).then((data) => {
		console.log(Date.now() - t1)

		// Firing the many cores requests
		var t2 = Date.now()
		Promise.all(arrayOrPromises_many.map(e => e())).then((data) => {
			console.log(Date.now() - t2)
		})
	})

}, 2000) // Waiting for both servers to be ready (using foreman)