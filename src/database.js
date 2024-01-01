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

    data.id ??= crypto.randomUUID();
    this.#database[table].push(data);
    await this.#persist();
    return data;
  }

  async update(table, id, data) {
    const entity = this.#database[table].find(entity => entity.id === id);

    if (!entity) {
      return null;
    }

    Object.assign(entity, data);
    await this.#persist();
    return entity;
  }

  async delete(table, id) {
    const index = this.#database[table].findIndex(entity => entity.id === id);

    if (index >= 0) {
      this.#database[table].splice(index, 1);
      await this.#persist();
    }
  }
}
