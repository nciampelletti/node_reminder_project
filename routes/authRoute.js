const express = require("express")
const passport = require("../middleware/passport")
const passportGH = require("../middleware/passportGH")

const { forwardAuthenticated } = require("../middleware/checkAuth")

const router = express.Router()

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"))

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
)

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/auth/login")
})

router.get(
  "/github",
  passportGH.authenticate("github", { scope: ["user:email"] })
)

router.get(
  "/github/callback",
  passportGH.authenticate("github", { failureRedirect: "/auth/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("sucess redirect")
    res.redirect("/reminders")
  }
)

// router.get("/sessions", (req, res) => {
//   req.sessionStore.sessionModel
//     .findAll()
//     .then((sessions) =>
//       sessions.map((sess) => JSON.parse(sess.dataValues.data))
//     )
//     .then((sessions) => {
//       res.send(sessions)
//     })
// })

module.exports = router
