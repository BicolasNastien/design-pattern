# Static Factory Method

## C'est quoi

Des méthodes statiques nommées sur la classe elle-même, qui remplacent le `new`. Le constructeur est `private` — on force l'instanciation à passer par ces méthodes.

Ce n'est pas un pattern GoF mais un **idiome de construction** (popularisé par *Effective Java*, Item 1). À ne pas confondre avec le Factory Method, qui repose sur l'héritage.

---

## Le principe clé : logique dans les méthodes, constructeur stupide

Le constructeur stocke une représentation interne unique et normalisée. Chaque méthode s'occupe de la transformation **avant** d'appeler le constructeur — il reçoit toujours une valeur propre, sans savoir d'où elle vient.

La logique de construction est ainsi répartie dans des méthodes claires et nommées, plutôt qu'entassée dans un constructeur surchargé.

---

## Différence avec `new`

| | `new` | Static Factory Method |
|---|---|---|
| Nom | Toujours le nom de la classe | Nommé selon le contexte |
| Signatures identiques | Impossible à distinguer | Chaque méthode a son nom |
| Peut retourner `null` | Non | Oui |
| Peut retourner un cache | Non | Oui |
| Héritage possible | Oui | Non (`private constructor`) |

---

## Quand l'utiliser

**✓ Oui** si :
- plusieurs formats ou sources d'entrée pour construire le même objet
- la construction peut échouer et tu veux retourner `null` plutôt que lever une exception
- certaines instances sont constantes et peuvent être mises en cache

**✗ Non** si :
- une seule façon de construire l'objet → `new` est plus simple et direct
- d'autres classes doivent étendre la tienne → le `private constructor` bloque l'héritage

---

## Cas d'usage typiques

- Grandeurs exprimables dans plusieurs unités : distance, durée, taille de fichier
- Objets construits depuis plusieurs formats : JSON, formulaire, base de données
- Construction qui peut échouer : retourner `null` plutôt que lever une exception
- Instances constantes réutilisées : couleurs, directions, états fixes

---

## Exemples réels

| | Méthodes |
|---|---|
| **JS standard** | `Date.now()`, `Array.from()`, `Object.create()`, `Promise.resolve()` |
| **Libs fonctionnelles** | `Option.some()`, `Result.ok()`, `Effect.succeed()` |

---

## Avantages / Inconvénients

**✓ Avantages**
- Le nom documente l'intention — plus lisible qu'un constructeur avec des paramètres ambigus
- Plusieurs "constructeurs" avec la même signature de types, sans ambiguïté
- Peut retourner `null`, une instance cachée, ou un sous-type

**✗ Inconvénients**
- `private constructor` interdit l'héritage
- Moins conventionnel que `new` — certains développeurs ne pensent pas à chercher des méthodes statiques

---

## À retenir
 
Le constructeur est stupide, les méthodes sont intelligentes. Quand un objet peut être construit de plusieurs façons différentes, chaque façon mérite son propre nom — pas un paramètre `format` de plus dans le constructeur.
