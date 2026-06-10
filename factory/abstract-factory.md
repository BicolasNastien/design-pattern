# Abstract Factory

## C'est quoi

Une interface de factory qui produit des **familles d'objets cohérents entre eux**. Le code client ne connaît que cette interface — jamais les classes concrètes. Chaque implémentation de la factory correspond à une famille.

---

## Le principe clé : cohérence garantie par construction

Sans Abstract Factory, le code client jongle avec des `if` pour assembler les bons composants ensemble. Avec, c'est impossible de mélanger des produits de familles différentes — la factory ne peut produire que des objets de sa propre famille.

Le code client reçoit une factory et lui délègue toute la création. Il parle uniquement aux interfaces produits, jamais aux classes concrètes.

---

## Différence avec la Simple Factory et la Factory Method

| | Simple Factory | Factory Method | Abstract Factory |
|---|---|---|---|
| Crée | Un seul type de produit | Un seul type de produit | Une famille de produits |
| Mécanisme | `switch/case` | Méthode abstraite redéfinie par sous-classe | Interface avec plusieurs méthodes `create*()` |
| Cohérence entre produits | Non garantie | Non garantie | Garantie |
| Ajouter une famille | Modifier le `switch` | Nouvelle sous-classe | Nouvelle factory |
| Ajouter un type de produit | Modifier le `switch` | Modifier la classe mère | Modifier toutes les factories |

---

## Quand l'utiliser

**✓ Oui** si :
- plusieurs familles de produits doivent rester cohérentes entre elles
- le code client ne doit jamais savoir quelle famille il utilise
- tu te retrouves à écrire `if (theme === 'x')` à plusieurs endroits dans ton code client — c'est le signal

**✗ Non** si :
- tu n'as qu'une seule famille → Simple Factory suffit
- les familles évoluent souvent en ajoutant de nouveaux types de produits → chaque ajout casse toutes les factories existantes
- la structure est trop lourde pour le besoin réel — trois thèmes et deux composants ne justifient pas quinze classes

---

## Cas d'usage typiques

- Thèmes UI : chaque thème produit des boutons, inputs, modals cohérents
- Drivers de base de données : chaque driver produit une connexion, une requête, une transaction compatibles
- Moteurs de rendu : web, mobile, desktop — chaque cible produit ses propres composants visuels
- Suites de tests : chaque environnement produit ses propres mocks et stubs cohérents

---

## Exemples réels

| | Familles |
|---|---|
| **React Native** | Composants iOS vs Android — même interface, rendu natif différent |
| **Doctrine (PHP)** | Drivers MySQL, PostgreSQL, SQLite — même API, implémentations différentes |
| **Abstract UI kits** | Material, Fluent, Cupertino — même composants, styles différents |

---

## Avantages / Inconvénients

**✓ Avantages**
- Cohérence entre produits garantie — impossible de mélanger des objets de familles différentes
- Code client totalement découplé des classes concrètes
- Ajouter une nouvelle famille ne touche à rien d'existant

**✗ Inconvénients**
- Ajouter un nouveau type de produit oblige à modifier toutes les factories existantes
- Structure verbeuse — N familles × M produits classes concrètes, plus N factories
- Complexité injustifiée si les familles sont peu nombreuses et simples

---

## À retenir
 
On ne crée pas un objet, on crée une famille. Le signal qui indique qu'on en a besoin : des `if (theme === 'x')` qui se répètent dans le code client pour assembler des objets qui vont ensemble.
