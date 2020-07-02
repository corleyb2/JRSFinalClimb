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

//Trips - By Location (+ pull relational entries to get attendees)
const getTripsByLocationName = async (request, response) => {
  try {
    console.log("GET TRIPS");
    console.log("request.query***", request.query.name);

    //gives back an array of objects(trips), each w unique id.
    const tripInstances = await TripModel.find({
      location: request.query.name,
    });
    console.log("trip instances", tripInstances);

    //gives arr of the tripInstances' _id properties.
    let newArr = tripInstances.map((tripInstance) => tripInstance._id);
    console.log("newarr &&&", newArr);

    //returns array of records matching this trip _id
    const relInstances = await RelationalModel.find()
      .where("scheduledTrip")
      .in(newArr)
      .populate("scheduledUser scheduledTrip");
    console.log("--rel instances $$$$", relInstances);
    response.status(200).send(relInstances);

    //relInstances.populate "scheduledTrip" duplicates tripInstances
    // const res = {
    //   tripInstances,
    //   relInstances,
    // };
    // console.log("&& RES **", res);
    // response.status(200).send(res);
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
