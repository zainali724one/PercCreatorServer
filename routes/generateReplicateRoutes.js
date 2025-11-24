const express = require("express");

const { generateReplicate } = require("../controllers/generateReplicate");

const router = express.Router();

router.post("/generateReplicate", generateReplicate);

module.exports = router;
