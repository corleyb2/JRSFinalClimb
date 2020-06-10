const path = require("path");

const {
  getAllTrips,
  findOneTrip,
  deleteTrip,
  createTrip,
  editTrip,
} = require("../controllers/tripController");

const tripRoutes = (app) => {
  app
    .route("/trip")
    .post(createTrip)
    .get(findOneTrip)
    .put(editTrip)
    .delete(deleteTrip);

  app.route("/trips").get(getAllTrips);
};

module.exports = { tripRoutes };
