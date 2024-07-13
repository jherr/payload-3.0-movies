# Payload 3.0 Movies Example

This repo showcases Payload 3.0, its support for Postgres (as well as MongoDB), its asset management system and admin dashboard, as well as simple deployment to Vercel.

### Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjherr%2Fpayload-3.0-movies&project-name=our-favorite-movies&env=PAYLOAD_SECRET,TMDB_API_KEY&build-command=pnpm%20run%20ci&stores=%5B%7B%22type%22%3A%22postgres%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D)

### Local Development

#### Create the local development environment file.

```bash
cp .env.example .env.development.local
```

#### Run the script start database script, which uses docker to spin up Postgres.

```bash
./start-database.sh
```

_Note: You can change the connection string in the .env.development.local file to point to a different database, you will also want to change it in the start-database.sh script._

#### Create a payload secret, perhaps using `openssl rand -base64 32` and set that value in the .env.development.local file.

Get a [TMBD API key](https://www.themoviedb.org/settings/api) and add it to the .env.development.local file. You will need an account on TMDB. It's all free.

#### Install the dependencies.

```bash
pnpm i
```

#### Create the database migration file.

```bash
pnpm run payload migrate:create initial
```

#### Run the migration to create the database tables.

```bash
pnpm run payload migrate
```

#### Start up the development server.

```bash
pnpm dev
```
