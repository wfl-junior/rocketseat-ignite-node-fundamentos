import http from "node:http";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (method === "GET" && url === "/users") {
    return response.writeHead(200).end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
    };

    users.push(newUser);
    return response.writeHead(201).end(JSON.stringify(newUser));
  }

  return response.writeHead(404).end();
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
