const router = require("express").Router();
const user = require("./users");

const message = require("./message");

router.use("/user", user);

router.use("/message", message);

module.exports = router;
