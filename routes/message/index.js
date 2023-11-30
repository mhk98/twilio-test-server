const router = require("express").Router();
const message = require("../../controllers/message/message.controller");

router.post("/create-message", message.createMessage);

module.exports = router;
