const http = require('request-promise')

REQUEST_COUNT = process.env.REQUEST_COUNT

const QUERY_COUNT = REQUEST_COUNT && +(REQUEST_COUNT) || 40

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

// Firing the one core requests
console.time('one core')
Promise.all(arrayOrPromises_one.map(e => e())).then((data) => {
	console.timeEnd('one core')

	// Firing the many cores requests
	console.time('many cores')
	Promise.all(arrayOrPromises_many.map(e => e())).then((data) => {
		console.timeEnd('many cores')
	})
})
