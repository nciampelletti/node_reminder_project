const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const path = require("path")
require("dotenv").config()
const passport = require("passport")

const port = process.env.port || 8000

const app = express()

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

//configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
)

//this is where we do all configuration for passportjs

const authRoute = require("./routes/authRoute")
const remindersRoute = require("./routes/remindRoute")

// Middleware for express
app.use(express.json())

app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

// app.use((req, res, next) => {
//   console.log(`User details are: `)
//   console.log(req.user)

//   console.log("Entire session object:")
//   console.log(req.session)

//   console.log(`Session details are: `)
//   console.log(req.session.passport)
//   next()
// })

app.use("/", remindersRoute)
app.use("/auth", authRoute)

app.listen(port, () => {
  console.log(`🚀 Server dd has started on port ${port}`)
})
