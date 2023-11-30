const jwt = require("jsonwebtoken");

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          status: "fail",
          error: "You are not authorized",
        });
      }

      console.log("token", token);
      // verify token
      let verifiedUser = null;

      verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = verifiedUser; // role  , Email
      console.log(req.user);

      // Implement guard using role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return res.status(403).json({
          status: "fail",
          error: "Forbidden",
        });
      }
      next();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

module.exports = auth;
