const express = require("express");
const bodyParser = require("body-parser");

const categoryRoutes = require("./src/routes/categoryRoutes");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = 3030;

app.use((req, res, next) => {
  const userType = req.headers["user-type"];

  if (userType === "admin") {
    next();
  } else {
    res
      .status(403)
      .json(
        errorResponse("Access denied. Only admins can access this resource.")
      );
  }
});

app.use(bodyParser.json());

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
