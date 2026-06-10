# Exercices — Simple Factory

**1. Véhicules de livraison**
Une factory crée des véhicules de livraison (`Scooter`, `Van`, `Drone`) selon le type de commande. Chaque véhicule connaît sa capacité de charge en kg et sa vitesse en km/h. Implémenter l'interface `DeliveryVehicle` et la `DeliveryVehicleFactory.create(type)`.

**2. Personnages de RPG**
Une factory crée des personnages (`Warrior`, `Mage`, `Rogue`) avec leurs statistiques de base (hp, attack, defense, speed). Chaque personnage expose une méthode `stats()` qui retourne un résumé textuel. Implémenter l'interface `Character` et la `CharacterFactory.create(type)`.

**3. Formats d'export**
Une factory crée des exporteurs (`CsvExporter`, `JsonExporter`, `XmlExporter`). Chaque exporteur expose une méthode `export(data: Record<string, unknown>[])` qui retourne une string dans le bon format. Implémenter l'interface `Exporter` et la `ExporterFactory.create(format)`.
