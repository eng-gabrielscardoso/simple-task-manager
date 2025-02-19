<div align="center">

# Simple Task Manager

![Main technologies](https://go-skill-icons.vercel.app/api/icons?i=html,css,ts,nodejs,express,react,jest,primevue,postgresql,typeorm,docker,github,vscode,linux)

A simple task manager made using monorepo approach and modern technologies with focus on usability, facility and lightweight.

</div>

## Usage

> Before all, make sure to have the necessary tools installed in your machine. Mandatory, Node.js or PNPM or any SDK manager and also Docker + Docker Compose. And, optionally, you may have to install a text editor (VS Code strongly recommended).

This project is a simple task manager made with a focus on the end customer, usability, ease, portability and also lightness. As it is still under development, one version may have incompatibilities with another, so feel free to always read the documentation as it will have all the necessary information for setup. Also, feel free to contribute with issues, pull requests and also in the discussions tab.

### API

First, navigate to the `/api` directory and copy the environment variables using the command `cp .env.example .env`. At this point, you may customise them according to your requirements.

Next, install the necessary dependencies for the application by running `pnpm install`. Wait until all dependencies are installed, and once the process is complete, you can proceed to the next step.

With Docker and Docker Compose installed, start the application’s database containers using the command `docker compose up -d`. Allow PostgreSQL to initialise properly — you can monitor the process using `docker compose logs -f postgres`.

Once the dependencies are installed and the containers are up and running, execute the database migrations by running `pnpm migrate:up`. This completes the setup. If you encounter any issues, try running `pnpm migrate:down`, then restart the containers and volumes before retrying the migration.

Finally, start the API by executing `pnpm dev`. The database connection will be established automatically during the application's bootstrap process.

To run the application's unit tests, use `pnpm test`. The application uses Jest as the primary testing framework, so you may wish to review its documentation before delving into the application's test suite.

### Web Client

First, navigate to the `/web` directory and copy the environment variables using the command `cp .env.example .env`. At this point, you may customise them according to your requirements.

Next, install the necessary dependencies for the application by running `pnpm install`. Wait until all dependencies are installed, and once the process is complete, you can proceed to the next step.

Finally, start the Web Client by executing `pnpm dev`.

## Licence

This project is licenced under the [MIT Licence](LICENSE).

## Author

This project is authored by [Gabriel Santos Cardoso](https://gabrielscardoso.com).
