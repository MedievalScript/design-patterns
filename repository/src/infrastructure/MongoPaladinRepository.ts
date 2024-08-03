import { Paladin, PaladinRepository } from "./../domain";
import { MongoClient, Db, ObjectId } from "mongodb";

export class MongoPaladinRepository implements PaladinRepository {
  private client: MongoClient;
  private db!: Db; // Using the definite assignment assertion
  private connected: boolean = false;

  constructor() {
    this.client = new MongoClient(
      "mongodb://mongo:mongo@localhost:27017/admin"
    );
  }

  private async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.db = this.client.db("db");
      this.connected = true;
    }
  }

  async findById(id: string): Promise<Paladin | null> {
    await this.connect();
    try {
      const result = await this.db
        .collection("paladins")
        .findOne({ _id: new ObjectId(id) });

      return result
        ? {
            id: result._id.toString(),
            name: result.name,
            rank: result.rank,
            kingdom: result.kingdom,
          }
        : null;
    } finally {
      await this.close();
    }
  }

  async findAll(): Promise<Paladin[]> {
    await this.connect();
    try {
      const result = await this.db.collection("paladins").find().toArray();

      return result.map(
        (paladin): Paladin => ({
          id: paladin._id.toString(),
          name: paladin.name,
          rank: paladin.rank,
          kingdom: paladin.kingdom,
        })
      );
    } finally {
      await this.close();
    }
  }

  async save({ name, rank, kingdom }: Paladin): Promise<void> {
    await this.connect();
    try {
      await this.db.collection("paladins").insertOne({ name, rank, kingdom });
    } finally {
      await this.close();
    }
  }

  async update(paladin: Paladin): Promise<void> {
    await this.connect();
    try {
      await this.db.collection("paladins").updateOne(
        { _id: new ObjectId(paladin.id) },
        {
          $set: {
            name: paladin.name,
            rank: paladin.rank,
            kingdom: paladin.kingdom,
          },
        }
      );
    } finally {
      await this.close();
    }
  }

  async delete(id: string): Promise<void> {
    await this.connect();
    try {
      await this.db.collection("paladins").deleteOne({ _id: new ObjectId(id) });
    } finally {
      await this.close();
    }
  }

  private async close() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
    }
  }
}
