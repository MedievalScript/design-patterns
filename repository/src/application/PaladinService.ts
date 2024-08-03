import { PaladinRepositoryFactory, RepositoryType } from "../infrastructure";
import { Paladin, PaladinRepository } from "./../domain";

export class PaladinService {
  private repository: PaladinRepository;

  constructor(repositoryType: RepositoryType) {
    this.repository = PaladinRepositoryFactory.create(repositoryType);
  }

  async getPaladinById(id: string): Promise<Paladin | null> {
    return this.repository.findById(id);
  }

  async getAllPaladins(): Promise<Paladin[]> {
    return this.repository.findAll();
  }

  async createPaladin(paladin: Paladin): Promise<void> {
    await this.repository.save(paladin);
  }

  async updatePaladin(paladin: Paladin): Promise<void> {
    await this.repository.update(paladin);
  }

  async deletePaladin(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
