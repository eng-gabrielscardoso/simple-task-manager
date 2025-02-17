import * as dotenv from "dotenv-safe";
import app from "./app";

dotenv.config();

app
  .listen(process.env.API_PORT, () =>
    console.log(`Server running on port: ${process.env.API_PORT}`)
  )
  .on("error", (err) =>
    console.error(
      `An error occurred during application bootstrapping. Error: ${err}`
    )
  );
