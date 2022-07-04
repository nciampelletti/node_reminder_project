const remindModel = require("../models/remindersModel").remindModel
const reminders = require("../models/remindersModel").reminders

let remindController = {
  list: (req, res) => {
    //console.log("we are here", req.user)
    res.render("reminder/index", {
      reminders: remindModel.findByUserId(req.user.id),
      username: req.user.name,
      isAdmin: req.user.role === "admin" ? true : false,
    })
  },

  new: (req, res) => {
    res.render("reminder/create")
  },

  listOne: (req, res) => {
    let searchResult = remindModel.findById(req.params.id * 1)

    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult })
    } else {
      res.render("reminder/index", {
        reminders: remindModel.findByUserId(req.user.id),
        username: req.user.name,
      })
    }
  },

  create: (req, res) => {
    let reminder = {
      id: reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      userId: req.user.id,
    }
    reminders.push(reminder)
    res.redirect("/reminders")
  },

  edit: (req, res) => {
    let searchResult = remindModel.findById(req.params.id * 1)
    res.render("reminder/edit", { reminderItem: searchResult })
  },

  update: (req, res) => {
    const Id = req.params.id
    const { title, description, completed } = req.body

    reminders.map((reminder) => {
      if (reminder.id == Id) {
        reminder.title = title
        reminder.description = description
        reminder.completed = completed === "true" ? true : false
      }
      return reminder
    })
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    const Id = req.params.id
    const removeIndex = reminders.findIndex((reminder) => reminder.id == Id)
    if (removeIndex >= 0) {
      reminders.splice(removeIndex, 1)
    }
    res.redirect("/reminders")
  },
}

module.exports = remindController
