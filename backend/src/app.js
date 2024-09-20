const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
