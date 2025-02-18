import express, { Application } from "express";
import { Routes } from "./routes/routes";
import path from "path";

const app: Application = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", Routes);

export const App: Application = app;
