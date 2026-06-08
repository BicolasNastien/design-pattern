interface Logger {
  log(message: string): void;
  warn(message: string): void;
  err(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) { console.log(`[LOG] ${message}`); }
  warn(message: string) { console.warn(`[WARN] ${message}`); }
  err(message: string) { console.error(`[ERROR] ${message}`); }
}

class FileLogger implements Logger {
  constructor(private filename: string) {}

  log(message: string) { console.log(`[FILE:${this.filename}] LOG ${message}`); }
  warn(message: string) { console.warn(`[FILE:${this.filename}] WARN ${message}`); }
  err(message: string) { console.error(`[FILE:${this.filename}] ERROR ${message}`); }
}

class SilentLogger implements Logger {
  log(_message: string) {}
  warn(_message: string) {}
  err(_message: string) {}
}

type TypeLogger = 'console' | 'file' | 'silent';

class LoggerFactory {
  static create(type: TypeLogger, options?: {filename?: string}): Logger {
    switch (type) {
      case 'console': return new ConsoleLogger();
      case 'file': return new FileLogger(options?.filename ?? 'app.log');
      case 'silent': return new SilentLogger();
      default: throw new Error(`Logger "${type}" unknown`);
    }
  }
}

// Client code
const logger = LoggerFactory.create('file', { filename: 'errors.log' });
logger.log('LOG...');
logger.warn('WARNING...');
logger.err('ERROR...');
