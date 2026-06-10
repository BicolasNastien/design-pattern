interface Parser {
  parse(content: string): string[];
  readonly format: string;
}

class ParserFactory {
  private registry = new Map<string, new () => Parser>();

  register(key: string, ctor: new () => Parser): this {
    this.registry.set(key, ctor);
    return this;
  }

  create(key: string): Parser {
    const Ctor = this.registry.get(key);

    if (!Ctor) throw new Error(`Parser "${key}" not registered`);
    return new Ctor();
  }

  has(key: string) {
    return this.registry.has(key);
  }

  keys(): string[] {
    return [...this.registry.keys()];
  }
}

class CsvParser implements Parser {
  format = 'csv';
  parse(content: string) {
    return content.split(',').map(s => s.trim());
  }
}

class JsonParser implements Parser {
  format = 'json';
  parse(content: string) {
    const data = JSON.parse(content);
    return Array.isArray(data) ? data.map(String) : [JSON.stringify(data)];
  }
}

class TsvParser implements Parser {
  format = 'tsv';
  parse(content: string) {
    return content.split('\t').map(s => s.trim());
  }
}

const factory = new ParserFactory();
factory
  .register('csv', CsvParser)
  .register('json', JsonParser)
  .register('tsv', TsvParser);

const parser = factory.create('csv');
parser.parse('alice, bob, carol');
// => ['alice', 'bob', 'carol']

