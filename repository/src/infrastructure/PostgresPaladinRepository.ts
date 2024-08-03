import { Paladin, PaladinRepository } from "./../domain";
import { Pool } from "pg";

export class PostgresPaladinRepository implements PaladinRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "pg",
      host: "localhost",
      database: "pg",
      password: "pg",
      port: 5432,
    });
  }

  async findById(id: string): Promise<Paladin | null> {
    const result = await this.pool.query(
      "SELECT * FROM paladins WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async findAll(): Promise<Paladin[]> {
    const result = await this.pool.query("SELECT * FROM paladins");
    return result.rows;
  }

  async save(paladin: Paladin): Promise<void> {
    await this.pool.query(
      "INSERT INTO paladins (id, name, rank, kingdom) VALUES ($1, $2, $3, $4)",
      [paladin.id, paladin.name, paladin.rank, paladin.kingdom]
    );
  }

  async update(paladin: Paladin): Promise<void> {
    await this.pool.query(
      "UPDATE paladins SET name = $2, rank = $3, kingdom = $4 WHERE id = $1",
      [paladin.id, paladin.name, paladin.rank, paladin.kingdom]
    );
  }

  async delete(id: string): Promise<void> {
    await this.pool.query("DELETE FROM paladins WHERE id = $1", [id]);
  }
}
