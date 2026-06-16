# Singleton

## C'est quoi

Un patron de création qui garantit qu'une classe n'a qu'**une seule instance**, accessible via un point d'accès global. Le constructeur est privé — la création est contrôlée par la classe elle-même.

---

## Le principe clé : lazy initialization

L'instance n'est créée qu'au premier appel de `getInstance()` — pas au chargement de la classe. Les appels suivants retournent toujours la même instance.

Toutes les références pointent sur le même objet — modifier l'état via une référence est visible depuis toutes les autres.

---

## Les 3 éléments

**`private constructor`** — impossible d'instancier depuis l'extérieur.

**`private static instance`** — la seule instance, stockée sur la classe elle-même.

**`static getInstance()`** — crée l'instance si elle n'existe pas encore, la retourne sinon.

---

## Quand l'utiliser

**✓ Oui** si :
- une ressource partagée ne doit exister qu'en un seul exemplaire (connexion DB, config, cache, logger)
- l'initialisation est coûteuse et doit être faite une seule fois
- un point d'accès global est nécessaire

**✗ Non** si :
- les tests unitaires sont importants — l'état global se propage entre les tests
- plusieurs instances pourraient être nécessaires plus tard — le Singleton est difficile à défaire
- le contexte est concurrent — risque de double instanciation sans synchronisation

---

## Cas d'usage typiques

- Connexion base de données — une seule connexion partagée
- Configuration applicative — chargée une fois, accessible partout
- Logger — une seule instance qui centralise les logs
- Cache — une seule instance partagée entre les services

---

## Pourquoi c'est controversé

Le Singleton est souvent considéré comme un **anti-pattern** pour trois raisons :

- **État global** — n'importe quelle partie du code peut modifier l'état du Singleton, rendant le comportement imprévisible.
- **Tests difficiles** — les tests partagent la même instance et se contaminent entre eux. Impossible de repartir d'un état propre sans reset manuel.
- **Couplage fort** — le code qui appelle `getInstance()` est couplé à la classe concrète, difficile à remplacer par un mock.

En pratique, on lui préfère souvent l'**injection de dépendances** — l'instance unique est créée une fois et injectée là où elle est nécessaire, sans point d'accès global.

---

## Avantages / Inconvénients

**✓ Avantages**
- Instance unique garantie
- Lazy initialization — créée seulement si utilisée
- Point d'accès global pratique

**✗ Inconvénients**
- État global — difficile à raisonner et à déboguer
- Tests difficiles — les tests se contaminent
- Couplage fort à la classe concrète
- Problèmes en contexte concurrent sans synchronisation

---

## À retenir

Le Singleton résout un vrai problème — garantir une instance unique. Mais l'état global qu'il introduit coûte souvent plus cher que le problème qu'il résout. Quand c'est possible, préférer l'injection de dépendances.
