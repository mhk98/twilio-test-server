const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

require("./models");
require("dotenv").config();
const shortid = require("shortid");
const cookieParser = require("cookie-parser");

// middlewares
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

// port initializing
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//static image folder
app.use("/Images", express.static("Images"));

// main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//catch-all middleware for "not found" routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// listening server
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
