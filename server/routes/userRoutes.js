const path = require("path");

const {
  getAllUsers,
  findOneUser,
  deleteUser,
  createUser,
  editUser,
} = require("../controllers/userController");

const userRoutes = (app) => {
  app
    .route("/user")
    .post(createUser)
    .get(findOneUser)
    .put(editUser)
    .delete(deleteUser);

  app.route("/users").get(getAllUsers);
};

module.exports = { userRoutes };
