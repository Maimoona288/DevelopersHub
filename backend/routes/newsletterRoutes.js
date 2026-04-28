const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  subscribeEmail,
  getSubscribers,
} = require("../controllers/newsletterController");

router.post("/", subscribeEmail);
router.get("/", auth, getSubscribers); // admin only

module.exports = router;