# Product Data Importer

This is a backend repository for the Product Data Importer app using NestJS, PostgreSQL, Prisma, Docker and so on.

## Run the App using Docker

**Prerequisites**: You have to have installed Docker and Docker-compose in your computer

- Create a `.env` file at the project root and add essential environment variables from `.env.example` file
- Open any command line tool in your computer like for Windows `Git Bash`, for Linux `Terminal` or `Terminator`, and for Mac `iTerm2`, and so on.
- Change directory to this project in which location you have coloned, for example `cd ~/www/nest-prisma-product-manager`
- Now run `docker compose up` or `docker-compose up` if you installed docker compose separately
- Now the server should listen on `http://localhost:8000` based on the port number you set in `.env`
- And finally run `npm run migrate:dev`

## How to import Product Data?

**Prerequisites**: You have to run this command first `npm run migrate:dev`

To import product data you'll need to follow the steps below:

- First put the `products.json` file at the root of the project directory
- Now you have two options to perform ETL (Extract, Transform, and Load Data):

  1. You can perform ETL using this npm script command from your terminal:

  ```bash
  npm run import-data
  ```

  2. You can perform ETL using GUI/Browser, for this go to this url `http://localhost:8000/api` and execute the `data-import` API

- To view data you can run this script command from the terminal:

```bash
npm run studio
```

- To reset data you can run this script command from the terminal:

```bash
npm run migrate:reset
```
