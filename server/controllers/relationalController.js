const { RelationalModel } = require("../models/relationalModel");
const { TripModel } = require("../models/tripModel");

// Relational Creation handled in tripController POST

// Create Relational
const postRelationalGivenTripID = async (request, response) => {
  try {
    console.log("Inside the Try of Create Rel Given TripID");
    console.log("Request.body ****", request.body);
    const relationalInstance = new RelationalModel(request.body);
    const createdRelational = await RelationalModel.create({
      scheduledUser: request.body.creationInfo.userId,
      scheduledTrip: request.body.creationInfo.tripId,
    });
    console.log("Create Relational", createdRelational);
    const locationMatches = await TripModel.find({
      location: request.body.matchInfo,
    });
    console.log("The Matches^^^^", locationMatches);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Delete Relational (query string)
const deleteRelational = async (request, response) => {
  try {
    console.log("DELETE RELATIONAL ENTRY", request);
    let deleteRelationalInstance = await RelationalModel.deleteOne(
      request.query
    );
    console.log(deleteRelationalInstance);
    response.send(deleteRelationalInstance);
  } catch (error) {
    console.log("the Catch", error);
    response.status(500).send(error);
  }
};

// Edit Relational
const editRelational = async (request, response) => {
  try {
    console.log("UPDATE CLIMBSPOT");
    let updatedRelational = await RelationalModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedRelational);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Relationals- All
const getAllRelationals = async (request, response) => {
  try {
    console.log("GET ALL CLIMBSPOTS");
    let relationalInstances = await RelationalModel.find({});
    console.log("relationalInstances!!!", relationalInstances);
    response.status(200).send(relationalInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};
//Relationals - given user_id in querystring
const getRelationalsGivenUser = async (request, response) => {
  try {
    console.log("GET RELS BY GIVEN USER");
    console.log("Req.query.scheduled user", request.query.scheduledUser);
    const relationalByUser = await RelationalModel.find({
      scheduledUser: request.query.scheduledUser,
    }).populate("scheduledTrip");
    console.log("relational arr", relationalByUser);
    response.status(200).send(relationalByUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  postRelationalGivenTripID,
  getAllRelationals,
  editRelational,
  deleteRelational,
  getRelationalsGivenUser,
};
