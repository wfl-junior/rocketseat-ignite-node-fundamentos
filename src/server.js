import http from "node:http";
import { json } from "./middlewares/json.js";

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  if (method === "GET" && url === "/users") {
    return response.writeHead(200).end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: crypto.randomUUID(),
      name: request.body.name,
      email: request.body.email,
    };

    users.push(newUser);
    return response.writeHead(201).end(JSON.stringify(newUser));
  }

  return response.writeHead(404).end();
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
