# Factory Method

## C'est quoi

Un pattern basé sur l'héritage. Une classe de base déclare une méthode abstraite de création — la **factory method**. Les sous-classes l'implémentent chacune à leur façon pour décider quel produit concret créer.

La logique métier vit dans la classe de base et utilise le produit sans jamais savoir lequel c'est.

---

## Le principe clé : la décision est distribuée dans les sous-classes

Avec une Simple Factory, la décision est centralisée dans un `switch`. Ici, chaque sous-classe est responsable de son propre produit — ajouter un type ne touche à rien d'existant, on crée juste une nouvelle sous-classe.

En pratique, les deux se combinent souvent : une Simple Factory crée le bon créateur, et le créateur produit le bon produit via sa factory method.

---

## Différence avec les autres variantes

| | Simple Factory | Factory Method | Abstract Factory |
|---|---|---|---|
| Mécanisme | `switch/case` | Méthode abstraite redéfinie par sous-classe | Interface avec plusieurs méthodes `create*()` |
| Décision de création | Centralisée | Distribuée dans les sous-classes | Distribuée dans les factories |
| Crée | Un produit | Un produit | Une famille de produits |
| Ajouter un type | Modifier le `switch` | Nouvelle sous-classe | Nouvelle factory |
| Couplage | Faible | Fort (héritage) | Faible (composition) |

---

## Quand l'utiliser

**✓ Oui** si :
- tu construis un framework ou une librairie que d'autres vont étendre par héritage
- les sous-classes ont besoin de personnaliser davantage que juste le type de produit créé
- tu veux que chaque sous-classe soit entièrement responsable de la création de son produit

**✗ Non** si :
- les types sont peu nombreux et stables → Simple Factory suffit et est plus lisible
- l'extensibilité n'est pas un vrai besoin → l'héritage ajoute de la complexité inutile
- tu veux créer des familles de produits cohérentes → Abstract Factory est mieux adapté

---

## Cas d'usage typiques

- Canaux de notification : chaque sous-classe produit sa propre notification (email, SMS, push)
- Parsers : chaque sous-classe produit son propre parser selon le format
- Connecteurs : chaque sous-classe produit sa propre connexion selon le protocole
- Rendus : chaque sous-classe produit son propre moteur de rendu selon la cible

---

## Exemples réels

| | Créateurs |
|---|---|
| **Java HttpClient** | Sous-classes pour HTTP/1.1, HTTP/2, WebSocket |
| **Frameworks MVC** | La classe de base déclare `createController()`, les sous-classes l'implémentent |
| **Loggers** | Chaque sous-classe produit son propre transport |

---

## Avantages / Inconvénients

**✓ Avantages**
- Code client découplé des produits concrets — il parle uniquement à la classe de base
- Ajouter un nouveau type = nouvelle sous-classe, rien d'existant n'est modifié
- La logique métier est centralisée dans la classe de base et partagée par toutes les sous-classes

**✗ Inconvénients**
- La hiérarchie grandit vite — un nouveau type implique une sous-classe produit et une sous-classe créateur
- L'héritage est un couplage fort — un changement dans la classe de base impacte toutes les sous-classes
- Plus complexe qu'une Simple Factory si l'extensibilité n'est pas un vrai besoin

---

## À retenir

La classe de base dit *quoi faire*, les sous-classes disent *avec quoi le faire*. C'est le seul pattern Factory basé sur l'héritage — les autres utilisent la composition.
