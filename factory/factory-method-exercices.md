## Exercices - Factory Method

**1. Transporteurs logistiques**
Une classe de base `LogisticsCompany` déclare une factory method `createVehicle()`. Les sous-classes `RoadCompany`, `SeaCompany`, `AirCompany` l'implémentent. La classe de base expose `planRoute(distance)` qui utilise le véhicule créé pour calculer le coût et la durée.

**2. Parsers de configuration**
Une classe de base `ConfigLoader` déclare `createParser()`. Les sous-classes `JsonConfigLoader`, `YamlConfigLoader`, `EnvConfigLoader` l'implémentent. La classe de base expose `load(source)` qui utilise le parser créé pour charger et valider la configuration.
Bonus : déléguer l'instanciation des parsers à une simple factory (`ParserFactory.create(type)`) appelée depuis chaque `createParser()`.

**3. Connecteurs de base de données**
Une classe de base `DatabaseManager` déclare `createConnection()`. Les sous-classes `PostgresManager`, `MySQLManager`, `SQLiteManager` l'implémentent. La classe de base expose `query(sql)` et `disconnect()` qui utilisent la connexion créée.
