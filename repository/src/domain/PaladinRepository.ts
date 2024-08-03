import { Paladin } from "./Paladin";

export interface PaladinRepository {
  findById(id: string): Promise<Paladin | null>;
  findAll(): Promise<Paladin[]>;
  save(paladin: Paladin): Promise<void>;
  update(paladin: Paladin): Promise<void>;
  delete(id: string): Promise<void>;
}
