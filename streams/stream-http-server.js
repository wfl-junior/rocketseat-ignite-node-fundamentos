import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer((request, response) => {
  return request.pipe(new InverseNumberStream()).pipe(response);
});

const port = 3334;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
