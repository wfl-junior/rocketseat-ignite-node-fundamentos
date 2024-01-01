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
      const newUser = await database.insert("users", {
        name: request.body.name,
        email: request.body.email,
      });

      return response.writeHead(201).end(JSON.stringify(newUser));
    },
  },
  {
    method: "DELETE",
    path: "/users/:id",
    handler: async (request, response) => {
      await database.delete("users", request.params.id);
      return response.writeHead(204).end();
    },
  },
];
