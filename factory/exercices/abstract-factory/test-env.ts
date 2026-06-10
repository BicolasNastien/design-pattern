interface Database {
  setup(): void;
  teardown(): void;
}
interface HttpClient {
  setup(): void;
  teardown(): void;
}
interface Logger {
  setup(): void;
  teardown(): void;
}

interface TestEnvironmentFactory {
  createDatabase(): Database;
  createHttpClient(): HttpClient;
  createLogger(): Logger;
}

class InMemoryDatabase implements Database {
  setup(): void {
    console.log("[UnitDB] in-memory database initialized");
  }
  teardown(): void {
    console.log("[UnitDB] in-memory database cleared");
  }
}
class MockHttpClient implements HttpClient {
  setup(): void {
    console.log("[UnitHttp] mocked HTTP responses ready");
  }
  teardown(): void {
    console.log("[UnitHttp] mocks reset");
  }
}
class SilentLogger implements Logger {
  setup(): void {
    console.log("[UnitLog] silent logger enabled");
  }
  teardown(): void {
    console.log("[UnitLog] no logs to purge");
  }
}

class TestDatabase implements Database {
  setup(): void {
    console.log("[IntDB] test database connection opened");
  }
  teardown(): void {
    console.log("[IntDB] schema cleaned, connection closed");
  }
}
class RealHttpClient implements HttpClient {
  setup(): void {
    console.log("[IntHttp] real HTTP client configured");
  }
  teardown(): void {
    console.log("[IntHttp] HTTP connections released");
  }
}
class VerboseLogger implements Logger {
  setup(): void {
    console.log("[IntLog] verbose logger enabled");
  }
  teardown(): void {
    console.log("[IntLog] logs written to disk");
  }
}

class UnitTestFactory implements TestEnvironmentFactory {
  createDatabase(): Database {
    return new InMemoryDatabase();
  }
  createHttpClient(): HttpClient {
    return new MockHttpClient();
  }
  createLogger(): Logger {
    return new SilentLogger();
  }
}
class IntegrationTestFactory implements TestEnvironmentFactory {
  createDatabase(): Database {
    return new TestDatabase();
  }
  createHttpClient(): HttpClient {
    return new RealHttpClient();
  }
  createLogger(): Logger {
    return new VerboseLogger();
  }
}

function runTestEnvironment(factory: TestEnvironmentFactory): void {
  const products = [
    factory.createDatabase(),
    factory.createHttpClient(),
    factory.createLogger(),
  ];

  products.forEach((p) => p.setup());
  console.log("--- running tests ---");
  products.forEach((p) => p.teardown());
}

function getTestMode(): string {
  return "unit";
}

const factory: TestEnvironmentFactory =
  getTestMode() === "integration"
    ? new IntegrationTestFactory()
    : new UnitTestFactory();

runTestEnvironment(factory);
