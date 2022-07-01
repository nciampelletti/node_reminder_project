let reminders = [
  {
    id: 1,
    title: "first reminder",
    description: "first description",
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: "second reminder",
    description: "second description",
    completed: false,
    userId: 1,
  },
  {
    id: 3,
    title: "first reminder",
    description: "first description",
    completed: false,
    userId: 2,
  },
  {
    id: 4,
    title: "first reminder",
    description: "first description",
    completed: false,
    userId: 3,
  },
]

const remindModel = {
  findByUserId: (id) => {
    return reminders.filter((item) => item.userId === id)
  },
  findById: (id) => {
    return reminders.find((item) => item.id === id)
  },
}

module.exports = { reminders, remindModel }
