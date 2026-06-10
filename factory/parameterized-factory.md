# Parameterized Factory — Registre dynamique

## C'est quoi

Une factory qui stocke ses constructeurs dans une `Map` au lieu d'un `switch`. On peut enregistrer et retirer des types **à runtime**, sans modifier la factory.

```typescript
class ParserFactory {
  private registry = new Map<string, new () => Parser>();

  register(key: string, ctor: new () => Parser): this {
    this.registry.set(key, ctor);
    return this;
  }

  create(key: string): Parser {
    const Ctor = this.registry.get(key);
    if (!Ctor) throw new Error(`"${key}" not registered`);
    return new Ctor();
  }
}
```

---

## Différence avec la Simple Factory

| | Simple Factory | Parameterized Factory |
|---|---|---|
| Dispatch | `switch/case` | `Map` |
| Ajouter un type | Modifier le `switch` | `factory.register(...)` |
| Types connus à | Compilation | Runtime |
| Extensible par des tiers | ✗ | ✓ |
| Complexité | Faible | Moyenne |

---

## Quand l'utiliser

**✓ Oui** si :
- tu construis une **librairie ou un framework** que d'autres vont étendre
- les types sont lus depuis une **config ou l'environnement** (donc inconnus à la compilation)
- tu veux un système de **plugins** — chaque plugin s'enregistre lui-même

**✗ Non** si :
- les types sont peu nombreux et tous sous ton contrôle → Simple Factory suffit
- tu anticipes une extensibilité qui n'arrivera peut-être jamais → YAGNI

---

## Ce que la librairie livre

Uniquement le contrat et la mécanique — **pas de produits concrets** :

```typescript
export interface Parser {           // le contrat
  parse(content: string): string[];
}

export class ParserFactory { ... }  // la mécanique

export const parserFactory = new ParserFactory(); // l'instance partagée
```

Les produits concrets vivent chez les utilisateurs, ou dans des packages séparés (`@lib/parser-csv`, `@lib/parser-xml`...).

---

## Exemples réels

| Outil | Ce qui est enregistré |
|---|---|
| **Passport.js** | Stratégies d'authentification (`local`, `google`, `jwt`...) |
| **Winston** | Transports de logs (`Console`, `File`, `Datadog`...) |
| **Jest** | Transformers (`ts-jest`, `babel-jest`...) |
| **Webpack** | Loaders (`css-loader`, `babel-loader`...) |
| **Knex** | Drivers de base de données (`pg`, `mysql`, `sqlite3`...) |

---

## Avantages / Inconvénients

**✓ Avantages**
- Principe ouvert/fermé : on étend sans modifier
- Les tiers peuvent contribuer sans accès au code source
- Enregistrement et suppression à chaud

**✗ Inconvénients**
- Erreurs détectées à runtime (clé inconnue) et non à la compilation
- Plus difficile à tracer : on ne voit pas d'un coup d'œil quels types existent
- Complexité inutile si l'extensibilité n'est pas un vrai besoin

---

## Lien avec le Prototype Registry

La structure est quasi identique — une `Map`, un `register()`, une méthode de création par clé. La différence est dans ce qui est stocké et comment l'objet est créé :

| | Parameterized Factory | Prototype Registry |
|---|---|---|
| Stocke | Des constructeurs `new () => T` | Des instances (prototypes) |
| Crée via | `new Ctor()` | `prototype.clone()` |
| Initialisation | À chaque `create()` | Une seule fois à l'enregistrement |
| Adapté si | Construction légère | Construction coûteuse |

La Parameterized Factory est le bon choix quand construire est léger. Le Prototype Registry est le bon choix quand construire est coûteux — on initialise une fois, on clone ensuite.

---

## À retenir

Pas de `switch` — un registre. La factory ne connaît pas les types qu'elle crée : ce sont les utilisateurs qui les apportent. C'est le pattern des librairies extensibles et des systèmes de plugins.
