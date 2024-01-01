import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, response) => {
      let search;

      if (request.query.search) {
        search = {
          name: request.query.search,
          email: request.query.search,
        };
      }

      const users = database.select("users", search);
      return response.writeHead(200).end(JSON.stringify(users));
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
    method: "PUT",
    path: "/users/:id",
    handler: async (request, response) => {
      const updatedUser = await database.update("users", request.params.id, {
        name: request.body.name,
        email: request.body.email,
      });

      return response.writeHead(200).end(JSON.stringify(updatedUser));
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
