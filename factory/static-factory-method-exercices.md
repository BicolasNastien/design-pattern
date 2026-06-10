## Exercices - Static Factory Method

**1. Coordonnées GPS**
Une classe `Coordinate` avec `private constructor`. Méthodes statiques : `fromDecimal(lat, lng)`, `fromDMS(latDegrees, lngDegrees, latMinutes, lngMinutes, latSeconds, lngSeconds, latDirection, lngDirection)` (degrés/minutes/secondes et direction pour chaque axe), `fromString('48.8566,2.3522')`. Exposer `toDecimal()` et `toString()`.

**2. Intervalle de temps**
Une classe `TimeRange` avec `private constructor`. Méthodes statiques : `fromDates(start, end)`, `fromStartAndDuration(start, durationMs)`, `lastDays(n)`, `today()`. Exposer `contains(date)`, `overlaps(other)`, `duration()`.

**3. Montant monétaire**
Une classe `Money` avec `private constructor`. Méthodes statiques : `fromCents(cents, currency)`, `fromAmount(amount, currency)`, `fromString('19.99 EUR')`. Exposer `add(other)`, `multiply(factor)`, `format()`. Lancer une erreur si les devises sont différentes lors d'une addition.
