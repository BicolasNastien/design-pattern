# Simple Factory

## C'est quoi

Une classe statique avec une méthode `create()` qui instancie le bon produit concret selon un type passé en paramètre. La décision se fait via un `switch`.

---

## Le principe clé : centraliser la création

Sans factory, chaque endroit du code qui a besoin d'un objet fait son propre `new`. Si la façon de construire cet objet change, il faut modifier partout. La Simple Factory centralise cette décision en un seul endroit.

Le code client dépend uniquement de l'interface produit et de la factory — jamais des classes concrètes

---

## Différence avec les autres variantes

| | Simple Factory | Factory Method | Parameterized Factory |
|---|---|---|---|
| Mécanisme | `switch/case` | Méthode abstraite redéfinie | `Map` + `register()` |
| Ajouter un type | Modifier le `switch` | Nouvelle sous-classe | `factory.register(...)` |
| Extensible par des tiers | ✗ | ✓ | ✓ |
| Complexité | Faible | Moyenne | Moyenne |
| Types connus à | Compilation | Compilation | Runtime |

---

## Quand l'utiliser

**✓ Oui** si :
- les types sont peu nombreux, stables, et tous sous ton contrôle
- pas besoin d'extensibilité par des tiers
- la lisibilité prime sur la flexibilité

**✗ Non** si :
- le `switch` grossit et est modifié souvent → signal de passer à une variante plus évoluée
- des tiers doivent pouvoir ajouter leurs propres types → Parameterized Factory
- les sous-classes ont besoin de personnaliser la logique de création → Factory Method

---

## Cas d'usage typiques

- Loggers : console, fichier, silence selon l'environnement
- Parsers : CSV, JSON, XML selon l'extension du fichier
- Notifications : email, SMS, push selon le canal
- Personnages, véhicules, formes : tout objet dont le type est connu à la compilation

---

## Avantages / Inconvénients

**✓ Avantages**
- Simple à comprendre et à lire — un `switch`, c'est tout
- Création centralisée — un seul endroit à modifier si la construction change
- Code client découplé des classes concrètes

**✗ Inconvénients**
- Viole le principe ouvert/fermé — chaque nouveau type modifie la factory
- Pas extensible par des tiers sans accès au code source
- Peut devenir difficile à maintenir si le nombre de types grossit

---

## À retenir

C'est le bon choix par défaut. On n'en sort que quand le `switch` devient un problème — pas avant.
