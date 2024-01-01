import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const port = 3333;

const server = http.createServer(async (request, response) => {
  await json(request, response);
  const url = new URL(request.url, `http://localhost:${port}`);
  request.query = Object.fromEntries(url.searchParams);

  for (const route of routes) {
    if (route.method === request.method && route.path === url.pathname) {
      return route.handler(request, response);
    }
  }

  return response.writeHead(404).end();
});

console.log(`Listening at http://localhost:${port}`);
server.listen(port);
