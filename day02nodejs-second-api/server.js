const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8181"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to day02 Todos application." });
});

require("./app/routes/todos.routes.js")(app);

app.use(express.static('static'));

// set port, listen for requests
const PORT = process.env.PORT || 8180;

require("./app/routes/todos.routes.js")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
