import http from "node:http";
import { Database } from "./database.js";
import { json } from "./middlewares/json.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  if (method === "GET" && url === "/users") {
    return response
      .writeHead(200)
      .end(JSON.stringify(database.select("users")));
  }

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: crypto.randomUUID(),
      name: request.body.name,
      email: request.body.email,
    };

    database.insert("users", newUser);
    return response.writeHead(201).end(JSON.stringify(newUser));
  }

  return response.writeHead(404).end();
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
