const { TripModel } = require("../models/tripModel");
const { RelationalModel } = require("../models/userModel");

//POST
// const createTrip = async (request, response) => {
//   try {
//     const userInfo = request.body.userData;
//     const tripInfo = request.body.trip;
//     console.log("POST TRIP");
//     let tripInstance = new TripModel(request.body);
//     const createdTrip = await TripModel.create(tripInstance);
//     console.log("*createdTrip*", createdTrip);
//     let relationalInstance = new RelationalModel({
//       scheduledUsers: userInfo,
//       scheduledClimb: createdTrip._id,
//     });
//     let createRelationalEntry = await RelationalModel.create(
//       relationalInstance
//     );
//     console.log("#createRelationalEntry#", createRelationalEntry);
//     response.send(createdTrip);
//     createRelationalEntry);
//   } catch (error) {
//     response.status(500).send(error);
//   }

const createTrip = async (request, response) => {
  try {
    console.log("POST TRIP");
    let tripInstance = new TripModel(request.body);
    console.log(tripInstance);
    const createdTrip = await TripModel.create(tripInstance);
    response.send(createdTrip);
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
    let updatedTrip = await TripModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedTrip);
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

// Trip - Find One by query
const findOneTrip = async (request, response) => {
  try {
    console.log("GET ONE TRIP");
    let trip = await TripModel.findOne(request.query);
    response.status(200).send(trip);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = { getAllTrips, findOneTrip, deleteTrip, createTrip, editTrip };
