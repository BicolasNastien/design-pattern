interface Parser {
  parse(raw: string): Record<string, unknown>;
}

// --- Concrete products ---
class JsonParser implements Parser {
  parse(raw: string): Record<string, unknown> {
    return JSON.parse(raw);
  }
}

class YamlParser implements Parser {
  parse(raw: string): Record<string, unknown> {
    // simplified version: one "key: value" per line
    const result: Record<string, unknown> = {};
    for (const line of raw.split("\n")) {
      const [key, value] = line.split(":").map(s => s.trim());
      if (key) result[key] = value;
    }
    return result;
  }
}

class EnvParser implements Parser {
  parse(raw: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const line of raw.split("\n")) {
      const [key, value] = line.split("=").map(s => s.trim());
      if (key) result[key] = value;
    }
    return result;
  }
}

abstract class ConfigLoader {
  protected abstract createParser(): Parser;

  load(source: string): Record<string, unknown> {
    const parser = this.createParser();
    const config = parser.parse(source);
    console.log(`Configuration loaded:`, config);
    return config;
  }
}

type ParserType = "json" | "yaml" | "env";

class ParserFactory {
  static create(type: ParserType): Parser {
    switch (type) {
      case "json": return new JsonParser();
      case "yaml": return new YamlParser();
      case "env": return new EnvParser();
      default: throw new Error(`Parser ${type} unknown`);
    }
  }
}

class JsonConfigLoader extends ConfigLoader {
  protected createParser(): Parser { return ParserFactory.create("json"); }
}

class YamlConfigLoader extends ConfigLoader {
  protected createParser(): Parser { return ParserFactory.create("yaml"); }
}

class EnvConfigLoader extends ConfigLoader {
  protected createParser(): Parser { return ParserFactory.create("env"); }
}

// Client code
new JsonConfigLoader().load('{"port": 8080, "host": "localhost"}');
// Configuration loaded: { port: 8080, host: 'localhost' }

new YamlConfigLoader().load("port: 8080\nhost: localhost");
// Configuration loaded: { port: '8080', host: 'localhost' }

new EnvConfigLoader().load("PORT=8080\nHOST=localhost");
// Configuration loaded: { PORT: '8080', HOST: 'localhost' }
