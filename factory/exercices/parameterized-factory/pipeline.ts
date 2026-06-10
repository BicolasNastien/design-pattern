interface DataTransformer {
  transform(input: string): string;
}

class DataTransformerFactory {
  private registry = new Map<string, new () => DataTransformer>();

  register(key: string, Ctor: new () => DataTransformer): this {
    this.registry.set(key, Ctor);
    return this;
  }

  create(key: string): DataTransformer {
    const Ctor = this.registry.get(key);
    if (!Ctor) throw new Error(`Transformer "${key}" not registered`);
    return new Ctor();
  }

  has(key: string): boolean {
    return this.registry.has(key);
  }

  keys(): string[] {
    return [...this.registry.keys()];
  }
}

class Uppercase implements DataTransformer {
  transform(input: string): string {
    return input.toUpperCase();
  }
}

class Trim implements DataTransformer {
  transform(input: string): string {
    return input.trim();
  }
}

class Slugify implements DataTransformer {
  transform(input: string): string {
    return input.trim().split(' ').join('-');
  }
}

class Truncate implements DataTransformer {
  transform(input: string): string {
    return input.substring(0, 2);
  }
}

// Client code
const factory = new DataTransformerFactory();
factory
  .register('uppercase', Uppercase)
  .register('trim', Trim)
  .register('slugify', Slugify)
  .register('truncate', Truncate);

const pipeline = ['uppercase', 'trim', 'slugify', 'truncate'];

const result = pipeline.reduce((acc, key) => factory.create(key).transform(acc), '  hello world  ');
console.log(result); // HE
