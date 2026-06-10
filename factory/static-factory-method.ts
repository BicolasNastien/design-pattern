class Duration {
  private constructor(private readonly ms: number) {}

  static fromSeconds(s: number): Duration {
    return new Duration(s * 1000);
  }

  static fromMinutes(m: number): Duration {
    return new Duration(m * 60 * 1000);
  }

  static fromHours(h: number): Duration {
    return new Duration(h * 3600 * 1000);
  }

  toMs(): number { return this.ms; }
}

// Usage
const a = Duration.fromSeconds(30); // => 30000
const b = Duration.fromHours(2);    // => 7200000

