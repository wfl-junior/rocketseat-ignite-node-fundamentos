import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const port = 3333;

const server = http.createServer(async (request, response) => {
  await json(request, response);
  const url = new URL(request.url, `http://localhost:${port}`);
  request.query = Object.fromEntries(url.searchParams);

  for (const route of routes) {
    if (route.method !== request.method) continue;

    const pathRegex = buildRoutePath(route.path);
    const matches = pathRegex.exec(url.pathname);

    if (!matches) continue;

    request.params = matches.groups ?? {};
    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

console.log(`Listening at http://localhost:${port}`);
server.listen(port);
