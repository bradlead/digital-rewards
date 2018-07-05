## Class Project (Backend) - Monzo Reward Web App

Frontend repo: https://github.com/cloverc/digi-rewards-front

#### File Structure
```bash
project
|
|-- seeders
|   |-- seed-rewards.js (active merchant rewards)
|
|-- src
|   |
|   |-- controllers
|   |   |-- account.js (add monzo account)
|   |   |-- auth.js (monzo authentication)
|   |   |-- users.js (users account creation)
|   |
|   |-- models
|   |   |-- account.js (account mongodb database)
|   |   |-- reward.js (reward mongodb database)
|   |   |-- transaction.js (transaction mongodb database)
|   |   |-- user.js (user mongodb database)
|   |
|   |-- routes
|       |-- account.js (account route directory)
|       |-- auth.js (authentication route directory)
|       |-- index.js (main routes directory)
|       |-- users.js (users route directory)
|
|-- index.js (server)
```
