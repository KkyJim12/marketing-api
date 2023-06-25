const { getUsers } = require("../services/users");

exports.index = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send({ message: users });
  } catch (error) {
    console.log(error);
  }
};

exports.store = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send({ message: users });
  } catch (error) {
    console.log(error);
  }
};
