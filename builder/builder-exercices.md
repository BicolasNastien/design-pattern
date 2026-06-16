## Exercices - Builder (Fluent)

**1. Requête de recherche**
Un `SearchQueryBuilder` construit une requête de recherche avec : `query(term)`, `filters(key, value)`, `sortBy(field, direction)`, `page(number)`, `limit(count)`, `build()`. Les filtres sont accumulables. `build()` retourne un objet `SearchQuery`.

**2. Email marketing**
Un `EmailBuilder` construit un email avec : `from(address)`, `to(addresses[])`, `subject(text)`, `htmlBody(html)`, `textBody(text)`, `attachment(filename, data)`, `scheduledAt(date)`, `build()`. Les pièces jointes sont accumulables.

**3. Pipeline CI/CD**
Un `PipelineBuilder` construit un pipeline avec : `name(text)`, `trigger(event)`, `stage(name)`, `step(command)`, `env(key, value)`, `timeout(ms)`, `build()`. Les stages et steps sont accumulables dans l'ordre d'appel.
