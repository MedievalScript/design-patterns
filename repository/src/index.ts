import { PaladinService } from "./application/PaladinService";
import { RepositoryType } from "./infrastructure";
import { ObjectId } from "mongodb";

async function main() {
  const postgresService = new PaladinService(RepositoryType.POSTGRES);
  const mongoService = new PaladinService(RepositoryType.MONGO);
  const apiService = new PaladinService(RepositoryType.API);

  const [postgresData, mongoData, apiData] = await Promise.all([
    postgresService.getAllPaladins(),
    mongoService.getAllPaladins(),
    apiService.getAllPaladins(),
  ]);

  const allData = [...postgresData, ...mongoData];

  console.log(allData);
}

main().catch(console.error);
