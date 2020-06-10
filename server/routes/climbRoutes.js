const path = require("path");

const {
  findSingleClimb,
  getAllClimbs,
  createClimb,
  editClimb,
  deleteClimb,
} = require("../controllers/climbController");

const climbRoutes = (app) => {
  app
    .route("/climb")
    .post(createClimb)
    .get(findSingleClimb)
    .put(editClimb)
    .delete(deleteClimb);

  app.route("/climbs").get(getAllClimbs);
};

module.exports = { climbRoutes };
