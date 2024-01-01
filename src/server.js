import http from "node:http";

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.headers["content-type"]?.startsWith("application/json")) {
    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    try {
      request.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
      request.body = null;
    }
  }

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
