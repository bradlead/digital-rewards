## Manchester Codes Final Project - Monzo-Reward PWA

Frontend repo: https://github.com/bradlead/digital-reward-frontend.git


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
|   |   |-- rewards.js (reward controller)
|   |   |-- transaction.js (transaction controller)
|   |   |-- users.js (users account creation)
|   |
|   |-- helper
|   |   |-- groupMerchnat.js (group Merchant function)
|   |
|   |-- models
|   |   |-- reward.js (reward mongodb database)
|   |   |-- transaction.js (transaction mongodb database)
|   |   |-- user.js (user mongodb database)
|   |
|   |-- routes
|       |-- account.js (account route directory)
|       |-- auth.js (authentication route directory)
|       |-- index.js (main routes directory)
|       |-- rewards.js (rewards route directory)
|       |-- transaction.js (transaction route directory)
|       |-- users.js (users route directory)
|
|-- index.js (server)
```
