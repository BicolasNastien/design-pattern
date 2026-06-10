class Money {
  private constructor(private readonly cents: number, private readonly currency: string) {}

  static fromCents(cents: number, currency: string): Money {
    if (!Number.isInteger(cents)) throw new Error("Cents must be an integer");
    return new Money(cents, currency);
  }

  static fromAmount(amount: number, currency: string): Money {
    if (!Number.isFinite(amount)) throw new Error("Amount must be a finite number");
    return new Money(Math.round(amount * 100), currency);
  }

  static fromString(input: string): Money {
    const [rawAmount, rawCurrency] = input.split(' ');
    const amount = Number(rawAmount);
    if (Number.isNaN(amount)) throw new Error(`Invalid amount: ${rawAmount}`);
    if (!rawCurrency) throw new Error(`Missing currency in: ${input}`);
    return Money.fromAmount(amount, rawCurrency);
  }

  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error(`Cannot add ${other.currency} to ${this.currency}`);

    return new Money(this.cents + other.cents, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.cents * factor), this.currency);
  }

  format(): string {
    return `${(this.cents / 100).toFixed(2)} ${this.currency}`;
  }
}
