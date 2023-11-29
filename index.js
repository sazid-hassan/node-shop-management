// index.js
const express = require("express");
const bodyParser = require("body-parser");

const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

app.use("/api", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
