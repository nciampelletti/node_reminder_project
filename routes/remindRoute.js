const express = require("express")
const router = express.Router()

const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth")
const remindController = require("../controllers/remindController")

router.get("/reminders", ensureAuthenticated, remindController.list)

router.get("/reminder/new", ensureAuthenticated, remindController.new)
router.get("/reminder/:id", ensureAuthenticated, remindController.listOne)
router.get("/reminder/:id/edit", ensureAuthenticated, remindController.edit)
router.post("/reminder/", ensureAuthenticated, remindController.create)

// Implement this yourself
router.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  remindController.update
)
router.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  remindController.delete
)

module.exports = router
