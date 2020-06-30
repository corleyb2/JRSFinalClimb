const { TripModel } = require("../models/tripModel");
const { RelationalModel } = require("../models/relationalModel");

//POST
const createTrip = async (request, response) => {
  try {
    console.log("hello");
    console.log("request.body", request.body);
    const { userData, trip } = request.body;
    const tripInstance = new TripModel(trip);
    const createdTrip = await TripModel.create(tripInstance);
    const relationalInstance = new RelationalModel({
      scheduledUser: userData.scheduledUser,
      scheduledTrip: createdTrip._id,
    });
    console.log("*** relationInstance", relationalInstance);
    const createRelationalEntry = await RelationalModel.create(
      relationalInstance
    );
    console.log("**!createRelationalEntry!", createRelationalEntry);
    const res = {
      createdTrip,
      createRelationalEntry,
    };
    response.status(200).send(res);
  } catch (error) {
    response.status(500).send(error);
  }
};

//DELETE(query string)
const deleteTrip = async (request, response) => {
  try {
    console.log("DELETE TRIP");
    let deleteTripInstance = await TripModel.deleteOne(request.query);
    console.log(deleteTripInstance);
    response.send(deleteTripInstance);
  } catch (error) {
    response.status(500).send(error);
  }
};

// EDIT
const editTrip = async (request, response) => {
  try {
    console.log("UPDATE TRIP");
    console.log("**request.query**", request.query);
    console.log("***request.body***", request.body);
    let updatedTrip = await TripModel.findOneAndUpdate(
      request.query,
      request.body,
      { new: true }
    );
    console.log("updatedTRIPPLZZ**", updatedTrip);
    response.status(200).send(updatedTrip);
  } catch (error) {
    response.status(500).send(error);
  }
};

//GET REQUESTS
// Trips - All
const getAllTrips = async (request, response) => {
  try {
    console.log("GET TRIPS");
    let tripInstances = await TripModel.find({});
    response.status(200).send(tripInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};

//Trips - Find all by location
const getTripsByLocationName = async (request, response) => {
  try {
    console.log("GET TRIPS");
    console.log("request.query***", request.query.name);
    const tripInstances = await TripModel.find({
      location: request.query.name,
    });
    console.log("trip instances", tripInstances);
    //gives back an array of objects(trips), each w unique id.

    // for tripInstances[i]._id (map or loop)
    // Query to RelationalModel
    // if scheduledTrip._id === trip._id, return attendees .populated
    // const tripAttendees = await RelationalModel.find({
    //  do something .....
    // });
    //do something with trip._id in the RelationalModel
    response.status(200).send(tripInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  getAllTrips,
  getTripsByLocationName,
  deleteTrip,
  createTrip,
  editTrip,
};
