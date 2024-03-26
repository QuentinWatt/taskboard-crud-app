# CRUD Task Board Application

This application was originally written as part of a job assessment. The assessment spec is written [here](./spec.md).

## Skills showcased in this project

- Docker & Docker Compose
- Laravel PHP & PHPUnit testing
  - RESTful API design
  - Database Design
- Vue 3 and Pinia
  - State Machines
- Axios
  - Http requests
- Cypress e2e testing

## Installation instructions

1. Clone this repository and CD into the directory

```bash
git clone https://github.com/QuentinWatt/taskboard-crud-app.git task-app

cd task-app
```

2. Copy the environment files for the Back End and the Front End.

```bash
cp taskmaster/.env.example taskmaster/.env
cp taskmaster-spa/.env.example taskmaster-spa/.env
```

3. Start the docker containers

```bash
docker compose up -d
```

4. Run the migrations

```bash
docker exec laravel_app php artisan migrate --force
docker exec laravel_app php artisan db:seed
```

5. Check the Docker Desktop app. You should now have 3 containers running. The projects should be accessable at these ports.
   - Laravel Back End: http://localhost:8000
   - Vue3 Front End: http://localhost:8081
