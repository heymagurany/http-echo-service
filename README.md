# HTTP Echo Service

A simple HTTP server that prints requests to `stdout`.

    node service.js <port> <status code>

* **port** (required): The port on which the server listens
* **status code** (optional, default `200`): the HTTP status code with which to respond

`ctrl-c` to exit