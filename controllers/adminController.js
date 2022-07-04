const users = require("../models/userModel").users
const userModel = require("../models/userModel").userModel

let adminController = {
  list: (req, res) => {
    req.sessionStore.all(function (err, sessions) {
      const activeSessions = []
      if (err) {
        res.redirect("/auth/login")
      }

      for (const session in sessions) {
        activeSessions.push({
          sessionId: session,
          userId: sessions[session].passport.user,
          userName: userModel.findById(sessions[session].passport.user * 1)
            .name,
        })
      }

      console.log(req.user)
      res.render("admin", { activeSessions, currentUser: req.user.name })
    })
  },

  destroy: (req, res) => {
    let sessionId = req.params.id

    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        res.redirect("/auth/login")
      }
      res.redirect("/admin")
    })
  },
}

module.exports = adminController
