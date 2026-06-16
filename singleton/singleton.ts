class Database {
  private static instance: Database | null = null;
  private connectionCount: number = 0;

  private constructor(private readonly url: string) {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database('postgresql://localhost:5432/db');
    }

    return Database.instance;
  }

  connect(): void {
    this.connectionCount++;
    console.log(`Connection #${this.connectionCount} to ${this.url}`);
  }

  getConnectionCount(): number {
    return this.connectionCount;
  }
}

// Client code
const db1 = Database.getInstance();
const db2 = Database.getInstance();
const db3 = Database.getInstance();

console.log(db1 === db2); // true - same instance
console.log(db2 === db3); // true - same instance

db1.connect();
db2.connect();

console.log(db3.getConnectionCount()); // 2 - shared state across all references
