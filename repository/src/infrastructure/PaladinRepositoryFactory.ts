import { PaladinRepository } from "./../domain";
import { PostgresPaladinRepository } from "./PostgresPaladinRepository";
import { MongoPaladinRepository } from "./MongoPaladinRepository";
import { ApiPaladinRepository } from "./ApiPaladinRepository";

export enum RepositoryType {
  POSTGRES,
  MONGO,
  API,
}

export class PaladinRepositoryFactory {
  static create(type: RepositoryType): PaladinRepository {
    switch (type) {
      case RepositoryType.POSTGRES:
        return new PostgresPaladinRepository();
      case RepositoryType.MONGO:
        return new MongoPaladinRepository();
      case RepositoryType.API:
        return new ApiPaladinRepository();
      default:
        throw new Error("Invalid repository type");
    }
  }
}
