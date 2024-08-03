import { PaladinService } from "./application/PaladinService";
import { RepositoryType } from "./infrastructure";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

async function main() {
  const postgresService = new PaladinService(RepositoryType.POSTGRES);
  const mongoService = new PaladinService(RepositoryType.MONGO);
  const apiService = new PaladinService(RepositoryType.API);

  postgresService.createPaladin({
    id: new ObjectId().toHexString(),
    name: "Tirion",
    rank: "Highlord",
    kingdom: "Lordaeron",
  });
}

main().catch(console.error);
