interface CacheEntry {
  value: unknown;
  expiresAt: number | null;
}

class MemoryCache {
  private static instance: MemoryCache | null = null;
  private data: Map<string, CacheEntry>;

  private constructor() {
    this.data = new Map<string, CacheEntry>();
  }

  static getInstance(): MemoryCache {
    if (MemoryCache.instance === null) {
      MemoryCache.instance = new MemoryCache();
    }
    return MemoryCache.instance;
  }

  set(key: string, value: unknown, ttl?: number): void {
    const expiresAt = ttl != null ? Date.now() + ttl : null;
    this.data.set(key, { value, expiresAt });
  }

  get(key: string): unknown {
    const entry = this.data.get(key);
    if (entry === undefined) {
      console.log(`[Error] Key "${key}" unknown`);
      return undefined;
    }

    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.data.delete(key);
      console.log(`[Error] Key "${key}" expired`);
      return undefined;
    }

    return entry.value;
  }

  invalidate(key: string): void {
    this.data.delete(key);
  }
}

function writingModule(): void {
  const cache = MemoryCache.getInstance();
  cache.set("user:42", { id: 42, name: "Alice" });  // Without TTL
  cache.set("token", "abc-123", 1000);              // Expires in 1s
  console.log("[A] Data written");
}

function readingModule(): void {
  const cache = MemoryCache.getInstance();
  console.log("[B] user:42 =", cache.get("user:42"));
  console.log("[B] token   =", cache.get("token"));
}

writingModule();
readingModule();

console.log(
  "Same instance ?",
  MemoryCache.getInstance() === MemoryCache.getInstance()
);
// True

setTimeout(() => {
  const cache = MemoryCache.getInstance();
  console.log("[After 1.1s] token =", cache.get("token")); // Expired -> undefined
  console.log("[After 1.1s] user:42 =", cache.get("user:42")); // Always there

  cache.invalidate("user:42");
  console.log("[After invalidate] user:42 =", cache.get("user:42")); // unknown
}, 1100);
