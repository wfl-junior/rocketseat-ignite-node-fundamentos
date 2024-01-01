import http from "node:http";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
    };

    users.push(newUser);
    response.statusCode = 201;
    return response.end(JSON.stringify(newUser));
  }

  response.statusCode = 405;
  return response.end(JSON.stringify({ error: "Method not allowed" }));
});

const port = 3333;
console.log(`Listening at http://localhost:${port}`);
server.listen(port);
