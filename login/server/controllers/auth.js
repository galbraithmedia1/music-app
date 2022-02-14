const users = [];
const bcrypt = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    const { password, username } = req.body;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].passwordHash);
        if (existing) {
          // users[i].password.push(password);

          let passObjCopy = { ...users[i] };

          delete passObjCopy.passwordHash;

          res.status(200).send(passObjCopy);
        }
      }
    }
    res.status(400).send("User not found.");
  },

  register: (req, res) => {
    // console.log("Registering User");
    // console.log(req.body);
    // users.push(req.body);

    const { username, email, password, firstName, lastName } = req.body;
    // res.status(200).send(req.body);

    const salt = bcrypt.genSaltSync(5);

    const passwordHash = bcrypt.hashSync(password, salt);

    let user = {
      username,
      email,
      firstName,
      lastName,
      passwordHash
    }

    users.push(user);
    let passObjCopy = { ...user };
    console.log(passwordHash);
    delete passObjCopy.passwordHash;
    res.status(200).send(passObjCopy);
  },
};
