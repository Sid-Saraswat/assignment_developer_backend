const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 8000;
const { verifyAccessToken } = require("./src/utils/jwt")

const app = express();

const signup = require("./src/routes/signup");
const login = require("./src/routes/login");
const refreshToken = require("./src/routes/refreshtoken");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// DATABASE CONNECTION
require("./src/db/connection");

// Routes
app.use("/signup", signup);
app.use("/login", login);
app.use("/refresh-token", refreshToken);

app.get("/validate-token", verifyAccessToken, (req, res) => {
    res.send("Hey Token Verifyed!! Access Granted!")
})

// START THE SERVER
app.listen(port, () => {
    console.log(`Website has been successfully started on port ${port}`);
});