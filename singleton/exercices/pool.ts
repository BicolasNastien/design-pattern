type Connection = {
  url: string,
  available: boolean;
}

class ConnectionPool {
  private static instance: ConnectionPool | null = null;
  private pool: Connection[];

  private constructor() {
    this.pool = [
      {url: 'connection1', available: true },
      {url: 'connection2', available: true },
      {url: 'connection3', available: true}
    ];
  }

  static getInstance(): ConnectionPool {
    if (ConnectionPool.instance === null) {
      ConnectionPool.instance = new ConnectionPool();
    }

    return ConnectionPool.instance;
  }

  acquire(): Connection | null {
    const connection = this.pool.find(c => c.available);

    if (!connection) {
      console.log('No connection from the pool is available...');
      return null;
    }

    connection.available = false;
    return connection;
  }

  release(connection: Connection): void {
    if (connection.available) {
      console.log('This connection is already available');
      return;
    }

    connection.available = true;
  }
}

// Client code
function serviceA(): Connection | null {
  const pool = ConnectionPool.getInstance();
  const connection = pool.acquire();
  console.log('[A] acquired', connection?.url);
  return connection;
}

function serviceB(): Connection | null {
  const pool = ConnectionPool.getInstance();
  const connection = pool.acquire();
  console.log('[B] acquired', connection?.url);
  return connection;
}

console.log(
  'Same pool ?',
  ConnectionPool.getInstance() === ConnectionPool.getInstance()
); // true

const connA = serviceA(); // [A] acquired connection1
const connB = serviceB(); // [B] acquired connection2 -> shared pool, A's connection is gone

if (connA) {
  ConnectionPool.getInstance().release(connA);
  console.log('[A] released', connA.url);
}

const connC = serviceA(); // [A] acquired connection1 -> reused after release
