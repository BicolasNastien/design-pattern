## Exercices - Parameterized Factory

**1. Moteur de rendu**
Une factory avec registre dynamique crée des renderers selon le type de média (`image`, `video`, `audio`). Chaque renderer expose `render(source)`. La factory expose `register(type, ctor)` et `create(type)`. Les renderers sont enregistrés à l'extérieur de la factory.

**2. Gestionnaire de paiement**
Une factory avec registre crée des processeurs de paiement (`stripe`, `paypal`, `virement`). Chaque processeur expose `process(amount, currency)`. Démontrer qu'un nouveau processeur (`crypto`) peut être enregistré sans modifier la factory.

**3. Pipeline de transformations**
Une factory avec registre crée des transformateurs de données (`uppercase`, `trim`, `slugify`, `truncate`). Chaque transformateur expose `transform(input)`. Le code client enregistre ses propres transformateurs et les crée via la factory.
