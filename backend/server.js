const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

let users = [];

// Register new user
app.post("/register", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user) {
        return res.json({ message: "User already exists" });
    }

    users.push({
        username,
        password
    });

    res.json({
        message: "Registration Successful"
    });

});

// Login user and create JWT token
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        { username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.json({
        token
    });

});

// Protected Route

app.get("/protected", authenticate, (req, res) => {

    res.json({
        message: "Welcome " + req.user.username
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});