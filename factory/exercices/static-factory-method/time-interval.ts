class TimeRange {
  private readonly start: Date;
  private readonly end: Date;

  // Defensive Copy - Date is mutable
  private constructor(start: Date, end: Date) {
    this.start = new Date(start.getTime());
    this.end = new Date(end.getTime());
  }

  static fromDates(start: Date, end: Date): TimeRange {
    if (start > end) {
      throw new Error("Start date must be before end date");
    }
    return new TimeRange(start, end);
  }

  static fromStartAndDuration(start: Date, durationMs: number): TimeRange {
    if (durationMs < 0) {
      throw new Error("Duration must be positive");
    }

    return new TimeRange(start, new Date(start.getTime() + durationMs));
  }

  static lastDays(n: number): TimeRange {
    if (n < 0) throw new Error("n must be non-negative");

    const end = new Date();
    const start = new Date(end.getTime());
    start.setDate(start.getDate() - n);
    return new TimeRange(start, end);
  }

  static today(): TimeRange {
    const end = new Date();
    const start = new Date(end.getTime());
    start.setHours(0, 0, 0, 0);

    return new TimeRange(start, end);
  }

  contains(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }

  overlaps(other: TimeRange): boolean {
    return (this.start < other.end && this.end > other.start);
  }

  duration(): number {
    return this.end.getTime() - this.start.getTime();
  }
}
