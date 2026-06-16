# Builder (Monteur)

## C'est quoi

Un patron de création qui construit des objets complexes **étape par étape**. La logique de construction est extraite de la classe produit dans un objet séparé appelé monteur. Le client n'appelle que les étapes dont il a besoin.

---

## Le problème qu'il résout

Un objet avec beaucoup de paramètres optionnels force un choix entre deux mauvaises options :

- **Constructeur télescopique** : multiplication de surcharges avec moins de paramètres à chaque fois — explose vite.
- **Constructeur géant** : tous les paramètres dans un seul constructeur — la plupart inutilisés la plupart du temps.

Le Builder extrait cette logique dans un objet dédié et laisse construire étape par étape.

---

## Les 5 participants

**1. L'interface Builder** — déclare toutes les étapes possibles de construction communes à tous les monteurs.

**2. Les Builders concrets** — implémentent ces étapes. Peuvent produire des produits de types complètement différents à partir des mêmes étapes (ex : une voiture ET son manuel).

**3. Le Produit** — l'objet complexe résultant. Les produits construits par différents builders n'ont pas besoin d'une interface commune.

**4. Le Directeur** — connaît les recettes de construction. Il ordonne les étapes dans le bon ordre. **Optionnel** — le client peut appeler les étapes directement.

**5. Le Client** — crée le builder, l'associe éventuellement au directeur, récupère le résultat auprès du builder — jamais auprès du directeur.

---

## Le rôle du Directeur

Le Directeur encapsule des recettes de construction réutilisables. Il sait dans quel ordre appeler les étapes pour produire une configuration particulière.

Sans Directeur, c'est le client qui ordonne les étapes — plus de flexibilité, mais les recettes ne sont pas réutilisables.

Le Directeur n'est pas obligatoire. Il devient utile quand plusieurs endroits du code ont besoin de construire la même configuration.

---

## Quand l'utiliser

**✓ Oui** si :
- l'objet a de nombreux paramètres optionnels — le constructeur devient illisible
- plusieurs représentations du même objet partagent les mêmes étapes de construction
- le client ne doit jamais récupérer un objet incomplet

**✗ Non** si :
- l'objet est simple avec peu de paramètres → `new` ou Simple Factory suffisent
- les paramètres sont tous obligatoires → un constructeur classique est plus lisible

---

## Cas d'usage typiques

- Requêtes SQL : `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` optionnels
- Documents : rapport PDF avec sections optionnelles
- Configurations : objet de config avec des dizaines d'options
- Objets de test : construction de fixtures avec seulement les champs pertinents au test

---

## Avantages / Inconvénients

**✓ Avantages**
- Construction étape par étape — on n'appelle que les étapes nécessaires
- Même code de construction pour des produits différents
- Responsabilité unique — logique de construction séparée de la logique métier
- Le client ne récupère jamais un objet incomplet

**✗ Inconvénients**
- Beaucoup de nouvelles classes — un builder par représentation, plus le directeur
- Complexité injustifiée pour des objets simples

---

## À retenir

Le signal qui indique qu'on en a besoin : un constructeur avec des paramètres optionnels qui commence à ressembler à un formulaire. Dès que tu te retrouves à passer `null` ou `undefined` pour des paramètres que tu n'utilises pas, c'est le moment d'introduire un Builder.
