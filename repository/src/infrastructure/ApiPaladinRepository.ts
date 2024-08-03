import axios from "axios";
import { Paladin, PaladinRepository } from "../domain";

export class ApiPaladinRepository implements PaladinRepository {
  private apiUrl = "https://jsonplaceholder.typicode.com/users";

  async findById(id: string): Promise<Paladin | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`);
      return this.mapToPaladin(response.data);
    } catch (error) {
      return null;
    }
  }

  async findAll(): Promise<Paladin[]> {
    const response = await axios.get(this.apiUrl);
    return response.data.map(this.mapToPaladin);
  }

  async save(paladin: Paladin): Promise<void> {
    await axios.post(this.apiUrl, this.mapToApiUser(paladin));
  }

  async update(paladin: Paladin): Promise<void> {
    await axios.put(`${this.apiUrl}/${paladin.id}`, this.mapToApiUser(paladin));
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  private mapToPaladin(apiUser: any): Paladin {
    return {
      id: apiUser.id.toString(),
      name: apiUser.name,
      rank: apiUser.company.name, // Usamos el nombre de la compañía como rango
      kingdom: apiUser.address.city, // Usamos la ciudad como reino
    };
  }

  private mapToApiUser(paladin: Paladin): any {
    return {
      id: paladin.id,
      name: paladin.name,
      company: { name: paladin.rank },
      address: { city: paladin.kingdom },
    };
  }
}
