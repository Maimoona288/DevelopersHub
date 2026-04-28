// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");

// const {
//   subscribeEmail,
//   getSubscribers,
// } = require("../controllers/newsletterController");

// router.post("/", subscribeEmail);
// router.get("/", auth, getSubscribers); // admin only

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  subscribeEmail,
  getSubscribers,
  sendNewsletterToAll,
} = require("../controllers/newsletterController");

/**
 * PUBLIC ROUTE
 * Subscribe email
 */
router.post("/", subscribeEmail);

/**
 * ADMIN ROUTE
 * Get all subscribers
 */
router.get("/", auth, getSubscribers);

/**
 * ADMIN ROUTE
 * Send newsletter to all subscribers
 */
router.post("/send", auth, sendNewsletterToAll);

module.exports = router;