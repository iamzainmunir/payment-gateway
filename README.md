**** How to run server ****
To install type "npm install"
Create .env file in root folder and paste these environemnt variables.

** Environemnt Variables **
ENVIRONMENT=development
PORT=4000
PGUSER=otumyurz
PGPASSWORD=nfNkTl-IlOnIyz5RhMT8gjxQWzAnLz4N
PGHOST=abul.db.elephantsql.com
PGPORT=5432
PGDATABASE=otumyurz
BCRYPT_SALT=10

To sun server on development type "npm run dev"
To sun server on production type "npm run prod"


For encryption of credit card number and cvv I'm using 3rd party library "bcryptjs". It's one of the most popular and easy to use library. It is helpful against rainbow table attacks and brute-force search attacks.

For luhn algorithm I'm using 3rd part library "luhn". It's easy to use and also compatible with client-side JavaScript.

I'm using ElephantSQL (Free version) for postgres database.


