const path = require("path");

const {
  findSingleRelational,
  getAllRelationals,
  editRelational,
  deleteRelational,
} = require("../controllers/relationalController");

const relationalRoutes = (app) => {
  app
    .route("/relational")
    .get(findSingleRelational)
    .put(editRelational)
    .delete(deleteRelational);

  app.route("/relationals").get(getAllRelationals);
};

module.exports = { relationalRoutes };
