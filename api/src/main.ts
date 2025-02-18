import { App } from "./app";
import { ApiDataSource } from "./data-source";
import secrets from "./helpers/secrets";

ApiDataSource.initialize()
  .then(() => {
    console.log("Database connection successfully");

    App.listen(secrets.API_PORT, () =>
      console.log(`Server running on port: ${secrets.API_PORT}`)
    ).on("error", (err) =>
      console.error(
        `An error occurred during application bootstrapping. Error: ${err}`
      )
    );
  })
  .catch((err) =>
    console.error(`Error during database connection. Details: ${err}`)
  );
