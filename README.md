# Payload 3.0 Movies Example

This repo showcases showcases Payload 3.0, it's support for Postgres (as well as MongoDB), it's asset management system and admin dashboard, as well as simple deployment to Vercel.

### Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjherr%2Fpayload-3.0-movies&project-name=our-favorite-movies&env=PAYLOAD_SECRET,TMDB_API_KEY&build-command=pnpm%20run%20ci&stores=%5B%7B%22type%22%3A%22postgres%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D)

### Local Development

Create the local development environment file.

```bash
cp .env.example .env.development.local
```

Create a local Postgres instance and change the connection string in .env.development.local to match.

There is a [docker-compose](./docker-compose.yml) file in the root of the project that will start a Postgres instance for you. Just run `docker-compose up -d` to start it.

Create a payload secret, perhaps using `openssl rand -base64 32` and set that value in the .env.development.local file.

Get a [TMBD API key](https://www.themoviedb.org/settings/api) and add it to the .env.development.local file. You will need an account on TMDB. It's all free.

Install the dependencies.

```bash
pnpm i
```

Run the migration to create the database tables.

```bash
pnpm run payload migrate
```

Start up the development server.

```bash
pnpm dev
```
