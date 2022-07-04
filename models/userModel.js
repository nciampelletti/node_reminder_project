const users = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
]

const userModel = {
  findOne: (email) => {
    const user = users.find((user) => user.email === email)
    if (user) {
      return user
    }
    throw new Error(`Couldn't find user with email: ${email}`)
  },
  findById: (id) => {
    const user = users.find((user) => user.id === id)

    return user
  },
  createNewUser: (id, name, email, password) => {
    users.push({ id, name, email, password })

    const user = users.find((user) => user.id === id)

    return user
  },
}

module.exports = { users, userModel }
