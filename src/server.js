import http from "node:http";

const server = http.createServer((request, response) => {
  return response.end("Hello World");
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
