const express = require("express")
const router = express.Router()

const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth")
const adminController = require("../controllers/adminController")

router.get("/", [ensureAuthenticated, isAdmin], adminController.list)

router.get(
  "/destroy/:id",
  [ensureAuthenticated, isAdmin],
  adminController.destroy
)

module.exports = router
