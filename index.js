//import express from "express";
const express = require("express");
const path = require("path");
//import { PORT, mongoDBURL } from "./config.js";
//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import booksRoute from "./routes/booksRoute.js";
const booksRoute = require("./routes/booksRoute");
//import cors from "cors";
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5555;

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (request, response) => {
  //console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

mongoose
  //.connect(mongoDBURL)
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log(`App connected to database ${process.env.DATABASE_URI}`);
    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
