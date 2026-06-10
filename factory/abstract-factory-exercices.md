## Exercices - Abstract Factory

**1. Composants UI par thème**
Une Abstract Factory produit des familles de composants UI cohérents. Deux thèmes : `MaterialFactory` et `CupertinoFactory`. Chaque factory crée un `Button`, un `Input`, et une `Card`. Chaque composant expose `render()` qui retourne une string HTML simulée.

**2. Suites bureautiques**
Une Abstract Factory produit des documents cohérents. Deux suites : `GoogleFactory` et `MicrosoftFactory`. Chaque factory crée un `Document`, une `Spreadsheet`, et une `Presentation`. Chaque produit expose `create(title)` et `export(format)`.

**3. Environnements de test**
Une Abstract Factory produit des objets de test cohérents. Deux environnements : `UnitTestFactory` et `IntegrationTestFactory`. Chaque factory crée un `Database`, un `HttpClient`, et un `Logger`. Chaque produit expose `setup()` et `teardown()`.
