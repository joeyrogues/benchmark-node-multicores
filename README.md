# Description
Benchmark between 2 executions of a same node app
* One set to use one core
* The other set to use all available cores

# Dependencies
```shell
npm install
```

# Run
```shell
# terminal 1
node one.js
```
```shell
# terminal 2
node many.js
```
```shell
# terminal 3
node benchmark.js
# or with env REQUEST_COUNT default to 100
REQUEST_COUNT=1
```