const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan("tiny"));

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));


//Routes
const cartsRoutes = require("./routes/cart");
const booksRoutes = require("./routes/book");
const usersRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comment");
const errorRoutes = require("./routes/error");

const api = process.env.API_URL;

app.use(`${api}/cart`, cartsRoutes);
app.use(`${api}/book`, booksRoutes);
app.use(`${api}/user`, usersRoutes);
app.use(`${api}/comment`, commentsRoutes);
app.use(`${api}/*`, errorRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "book_store_database_2",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(8000, () => {
  console.log("server is running http://localhost:8000");
});
