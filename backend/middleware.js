const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

// check JWT token
function authenticate(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            message: "Token Missing"
        });
    }

    try {
      // verify token
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();

    } catch (error) {

        res.json({
            message: "Invalid Token"
        });

    }

}

module.exports = authenticate;