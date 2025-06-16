const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsEndToEndEncrypted"; // Same secret used while generating token

const fetchUser = (req, res, next) => {
  // Get the user token from header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwtSecret);
    // You stored { user: { id: user._id } } while generating token
    req.user = data.user; // req.user = { id: user._id }
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchUser;
