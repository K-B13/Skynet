const JWT = require("jsonwebtoken");

// Middleware function to check for valid tokens
function tokenChecker(req, res, next) {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      // Add the userId from the payload to the req object.
      req.userId = payload.userId;
      next();
    }
  });
}

module.exports = tokenChecker;
