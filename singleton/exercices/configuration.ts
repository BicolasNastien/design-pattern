import { readFileSync } from "fs";

class ConfigManager {
  private static instance: ConfigManager | null = null;
  private config: Record<string, unknown>;
  private constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig() {
    const raw = readFileSync("./config.json", "utf-8");
    return JSON.parse(raw);
  }

  get(key: string): unknown {
    return this.config[key];
  }

  static getInstance() {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}

const a = ConfigManager.getInstance();
const b = ConfigManager.getInstance();

console.log(a === b);
console.log(a.get("port"));
console.log(b.get("host"));

