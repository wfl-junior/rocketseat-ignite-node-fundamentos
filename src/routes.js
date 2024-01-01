import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, response) => {
      return response
        .writeHead(200)
        .end(JSON.stringify(database.select("users")));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: async (request, response) => {
      const newUser = {
        id: crypto.randomUUID(),
        name: request.body.name,
        email: request.body.email,
      };

      database.insert("users", newUser);
      return response.writeHead(201).end(JSON.stringify(newUser));
    },
  },
  {
    method: "DELETE",
    path: "/users/:id",
    handler: async (request, response) => {
      console.log(request.params);
      return response.writeHead(204).end();
    },
  },
];
