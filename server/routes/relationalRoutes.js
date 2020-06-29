const path = require("path");

const {
  postRelationalGivenTripID,
  getAllRelationals,
  editRelational,
  deleteRelational,
  getRelationalsGivenUser,
} = require("../controllers/relationalController");

const relationalRoutes = (app) => {
  app
    .route("/relational")
    .post(postRelationalGivenTripID)
    .get(getRelationalsGivenUser)
    .put(editRelational)
    .delete(deleteRelational);

  app.route("/relationals").get(getAllRelationals);
};

module.exports = { relationalRoutes };
