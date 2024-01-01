import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  for (const route of routes) {
    if (route.method === method && route.path === url) {
      return route.handler(request, response);
    }
  }

  return response.writeHead(404).end();
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
