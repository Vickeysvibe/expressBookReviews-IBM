const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { authenticateToken } = require("./MiddleWare/authenticateToken.js");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", authenticateToken);

const PORT = 3434;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running at port " + PORT));
