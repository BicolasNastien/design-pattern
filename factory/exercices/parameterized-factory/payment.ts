interface PaymentProcessor {
  process(amount: number, currency: string): void;
}

class PaymentProcessorFactory {
  private registry = new Map<string, new () => PaymentProcessor>();

  register(key: string, Ctor: new () => PaymentProcessor): this {
    this.registry.set(key, Ctor);
    return this;
  }

  create(key: string): PaymentProcessor {
    const Ctor = this.registry.get(key);

    if (!Ctor) throw new Error(`PaymentProcessor "${key}" not registered`);
    return new Ctor();
  }

  has(key: string): boolean {
    return this.registry.has(key);
  }

  keys(): string[] {
    return [...this.registry.keys()];
  }
}

class Stripe implements PaymentProcessor {
  process(amount: number, currency: string): void {
    console.log(`[Stripe] Processing ${amount} ${currency}`);
  }
}

class Paypal implements PaymentProcessor {
  process(amount: number, currency: string): void {
    console.log(`[Paypal] Processing ${amount} ${currency}`);
  }
}

class BankTransfer implements PaymentProcessor {
  process(amount: number, currency: string): void {
    console.log(`[BankTransfer] Processing ${amount} ${currency}`);
  }
}

// Client code
const factory = new PaymentProcessorFactory();
factory
  .register('stripe', Stripe)
  .register('paypal', Paypal)
  .register('virement', BankTransfer);

const stripePaymentProcessor = factory.create('stripe');
const paypalPaymentProcessor = factory.create('paypal');
const bankTransferPaymentProcessor = factory.create('virement');

stripePaymentProcessor.process(100, '€'); // [Stripe] Processing 100 €
paypalPaymentProcessor.process(42, '$');  // [Paypal] Processing 42 $
bankTransferPaymentProcessor.process(1, '€'); // [BankTransfer] Processing 1 €

// Register new PaymentProcessor
class Crypto implements PaymentProcessor {
  process(amount: number, currency: string): void {
    console.log(`[Crypto] Processing ${amount} ${currency}`);
  }
}
factory.register('crypto', Crypto);
const cryptoPaymentProcessor = factory.create('crypto');
cryptoPaymentProcessor.process(42, 'BTC'); // [Crypto] Processing 42 BTC
