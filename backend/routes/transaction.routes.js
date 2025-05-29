const express = require("express");
const router = express.Router();
const transacao = require("../controllers/transaction.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/", verifyToken, transacao.getAll);
router.post("/", verifyToken, transacao.create);
router.put("/:id", verifyToken, transacao.update);
router.delete("/:id", verifyToken, transacao.remove);

module.exports = router;
