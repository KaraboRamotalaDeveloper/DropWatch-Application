const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;
const jwt_exp = process.env.JWT_EXP;

const generateToken = (payload) => {
  if (payload) {
    return jwt.sign(payload, jwt_secret, { expiresIn: jwt_exp });
  }
  return null;
};

const decodeToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, jwt_secret);
    }
    return null;
  } catch (err) {
    console.log("Something wrong with decoding token");
    console.log(err);
    return null;
  }
};

module.exports = { generateToken, decodeToken };
