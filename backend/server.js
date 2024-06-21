const express = require("express");
const app = express();
require("dotenv").config();
require("./db/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

//import routes
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/public/uploads", express.static("public/uploads"));

//routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", categoryRoute);

app.use("/api", productRoute);

app.use("/api", userRoute);
app.use("/api", orderRoute);

app.use("/api", paymentRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server stated on port ${port}`);
});
