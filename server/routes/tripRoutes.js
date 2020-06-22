const path = require("path");

const {
  getAllTrips,
  getTripsByLocationName,
  deleteTrip,
  createTrip,
  editTrip,
} = require("../controllers/tripController");

const tripRoutes = (app) => {
  app
    .route("/trip")
    .post(createTrip)
    .get(getTripsByLocationName)
    .put(editTrip)
    .delete(deleteTrip);

  app.route("/trips").get(getAllTrips);
};

module.exports = { tripRoutes };
