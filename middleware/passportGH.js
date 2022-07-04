const passport = require("passport")
const userController = require("../controllers/userController")
const GitHubStrategy = require("passport-github2").Strategy
const { users, userModel } = require("../models/userModel")

const ghStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {
    const user = userController.getUserById(profile.id)
    if (!user) {
      userController.createUser(profile.id, profile.displayName, "", "", "user")
    }

    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        })
  }
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id)
  if (user) {
    done(null, user)
  } else {
    done({ message: "User not found" }, null)
  }
})

module.exports = passport.use(ghStrategy)

// {
//   id: 3,
//   name: "Jonathan Chen",
//   email: "jonathan123@gmail.com",
//   password: "jonathan123!",
// },
