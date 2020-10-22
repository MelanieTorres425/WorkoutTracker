const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
  });

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
