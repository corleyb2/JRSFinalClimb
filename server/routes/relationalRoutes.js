const path = require("path");

const {
  findSingleRelational,
  getAllRelationals,
  createRelational,
  editRelational,
  deleteRelational,
} = require("../controllers/relationalController");

const relationalRoutes = (app) => {
  app
    .route("/relational")
    .post(createRelational)
    .get(findSingleRelational)
    .put(editRelational)
    .delete(deleteRelational);

  app.route("/relationals").get(getAllRelationals);
};

module.exports = { relationalRoutes };
