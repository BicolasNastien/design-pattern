const DEFAULT_TIMEOUT_MS = 30_000;   // (5) named constant instead of a magic number

interface IPipelineBuilder {
  name(text: string): this;
  trigger(event: string): this;
  stage(name: string): this;
  step(command: string): this;
  env(key: string, value: string): this;
  timeout(ms: number): this;
  build(): Pipeline;
}

interface Pipeline {
  name: string;
  event: string;
  stages: string[];                  // (4) plural: these are collections
  steps: string[];
  env: Record<string, string>;       // (3) plain object: serializable to JSON
  timeout: number;
}

class PipelineBuilder implements IPipelineBuilder {
  private _name: string = '';
  private _event: string = '';
  private _stages: string[] = [];
  private _steps: string[] = [];
  private _env: Map<string, string> = new Map();   // Map internally: .has()/.set() are convenient
  private _timeout: number = DEFAULT_TIMEOUT_MS;

  name(text: string): this {
    this._name = text;
    return this;
  }

  trigger(event: string): this {
    this._event = event;
    return this;
  }

  // singular method: adds ONE element to the collection
  stage(name: string): this {
    this._stages.push(name);
    return this;
  }

  step(command: string): this {
    this._steps.push(command);
    return this;
  }

  env(key: string, value: string): this {
    if (this._env.has(key)) {
      throw new Error(`Duplicate key "${key}" in environment variables`);
    }
    this._env.set(key, value);
    return this;
  }

  timeout(ms: number): this {
    this._timeout = ms;
    return this;
  }

  build(): Pipeline {
    // (2) validation: never produce an invalid object
    if (!this._name) throw new Error('name is required');
    if (!this._event) throw new Error('trigger is required');

    return {
      name: this._name,
      event: this._event,
      stages: [...this._stages],                 // (1) defensive copies
      steps: [...this._steps],                   //     the built object is independent
      env: Object.fromEntries(this._env),        // (1)+(3) Map -> plain object
      timeout: this._timeout,
    };
  }
}

const pipeline = new PipelineBuilder()
  .name('deploy')
  .trigger('push')
  .stage('build')
  .step('npm ci')
  .step('npm run build')
  .stage('deploy')
  .step('npm run deploy')
  .env('NODE_ENV', 'production')
  .timeout(60_000)
  .build();
// -> stages: ['build', 'deploy'], steps: ['npm ci', 'npm run build', 'npm run deploy']
//    accumulated in call order
