const express = require("express");

const router = express.Router();

const {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings,
} = require("../controllers/settings");

router.route("/").get(getSettings).post(createSettings);
router.route("/settings/:userId").get(getSettings)

router
  .route("/:userId")
  .get(getSettings)
  .put(updateSettings)
  .delete(deleteSettings);

module.exports = router;
