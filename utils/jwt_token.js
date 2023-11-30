const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (userInfo) => {

  const payload = {
    Email: userInfo.Email,
    role: userInfo.role,
  };

  // console.log("payload", payload);

  //Token generate
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });

  return token;
};


