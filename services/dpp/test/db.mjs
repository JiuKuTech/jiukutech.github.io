import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
export class LocalD1 {
  constructor() {
    this.db = new DatabaseSync(":memory:");
    this.db.exec(
      readFileSync(
        new URL("../migrations/0001_passports.sql", import.meta.url),
        "utf8",
      ),
    );
  }
  prepare(sql) {
    const db = this.db;
    let args = [];
    const object = {
      bind(...v) {
        args = v;
        return object;
      },
      async first() {
        return db.prepare(sql).get(...args) || null;
      },
      async all() {
        return { results: db.prepare(sql).all(...args) };
      },
      async run() {
        return { results: [], meta: db.prepare(sql).run(...args) };
      },
      execute() {
        const s = db.prepare(sql);
        return s.columns().length
          ? { results: s.all(...args) }
          : { results: [], meta: s.run(...args) };
      },
    };
    return object;
  }
  async batch(statements) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = statements.map((s) => s.execute());
      this.db.exec("COMMIT");
      return result;
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
  }
  close() {
    this.db.close();
  }
}
