import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then(database => (this.#database = JSON.parse(database)))
      .catch(() => this.#persist());
  }

  async #persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  async insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    await this.#persist();
  }
}
