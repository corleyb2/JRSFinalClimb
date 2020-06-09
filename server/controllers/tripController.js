import { TripModel } from "../models/tripModel";

//POST
const createTrip = app.post("/trip", async (request, response) => {
  try {
    console.log("POST TRIP");
    let tripInstance = new TripModel(request.body);
    console.log(tripInstance);
    const createdTrip = await TripModel.create(tripInstance);
    response.send(createdTrip);
  } catch (error) {
    response.status(500).send(error);
  }
});

//DELETE(query string)
const deleteTrip = app.delete("/trip", async (request, response) => {
  try {
    console.log("DELETE TRIP");
    let deleteTripInstance = await TripModel.deleteOne(request.query);
    console.log(deleteTripInstance);
    response.send(deleteTripInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

// EDIT
const editTrip = app.put("/trip", async (request, response) => {
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
});

//GET REQUESTS
// Trips - All
const getAllTrips = app.get("/trips", async (request, response) => {
  try {
    console.log("GET TRIPS");
    let tripInstances = await UserModel.find({});
    response.status(200).send(tripInstances);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Trip - Find One by query
const findOneTrip = app.get("/trip", async (request, response) => {
  try {
    console.log("GET ONE TRIP");
    let trip = await TripModel.findOne(request.query);
    response.status(200).send(trip);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = { getAllTrips, findOneTrip, deleteTrip, createTrip, editTrip };
