## Exercices - Singleton

**1. Gestionnaire de configuration**
Un `ConfigManager` singleton charge une fois la configuration depuis un fichier et la rend accessible globalement via `get(key)`. Implémenter la lazy initialization. Démontrer que plusieurs appels à `getInstance()` retournent la même instance.

**2. Pool de connexions**
Un `ConnectionPool` singleton maintient un ensemble de connexions réutilisables. Exposer `acquire()` (obtenir une connexion libre) et `release(connection)` (remettre dans le pool). Démontrer que toutes les parties du code partagent le même pool.

**3. Cache mémoire**
Un `MemoryCache` singleton stocke des données en mémoire avec un TTL. Exposer `set(key, value, ttl)`, `get(key)`, et `invalidate(key)`. Démontrer que les données mises en cache par une partie du code sont accessibles depuis une autre.
