interface Connection {
  execute(sql: string): string;
  close(): void;
}

class PostgresConnection implements Connection {
  execute(sql: string): string {
    return `[Postgres] execution: ${sql}`;
  }

  close(): void {
    console.log("[Postgres] connection closed");
  }
}

class MySQLConnection implements Connection {
  execute(sql: string): string {
    return `[MySQL] execution: ${sql}`;
  }

  close(): void {
    console.log("[MySQL] connection closed");
  }
}

class SQLiteConnection implements Connection {
  execute(sql: string): string {
    return `[SQLite] execution: ${sql}`;
  }

  close(): void {
    console.log("[SQLite] connection closed");
  }
}

abstract class DatabaseManager {
  private connection: Connection | null = null;

  protected abstract createConnection(): Connection;

  private ensureConnected(): Connection {
    if (this.connection === null) {
      this.connection = this.createConnection();
    }

    return this.connection;
  }

  query(sql: string): string {
    return this.ensureConnected().execute(sql);
  }

  disconnect(): void {
    if (this.connection !== null) {
      this.connection.close();
      this.connection = null;
    }
  }
}

class PostgresManager extends DatabaseManager {
  protected createConnection(): Connection {
    return new PostgresConnection();
  }
}

class MySQLManager extends DatabaseManager {
  protected createConnection(): Connection {
    return new MySQLConnection();
  }
}

class SQLiteManager extends DatabaseManager {
  protected createConnection(): Connection {
    return new SQLiteConnection();
  }
}

// Client code
const managers: DatabaseManager[] = [
  new PostgresManager(),
  new MySQLManager(),
  new SQLiteManager(),
];

for (const mgr of managers) {
  console.log(mgr.query("SELECT * FROM users;"));
  mgr.disconnect();
}
