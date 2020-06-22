const { RelationalModel } = require("../models/relationalModel");

// Relational Creation handled in tripController POST

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

// const getRelationalsGivenClimb = async (request, response) => {
//   try {
//     console.log("GET RELS BY GIVEN TRIP");
//     console.log("Req.query.scheduled trip", request.query.scheduledTrip);
//     const relationalByTrip = await RelationalModel.find({
//       scheduledTrip: request.query.scheduledTrip,
//     }).populate("scheduledUser");
//     console.log("relational arr", relationalByUser);
//     response.status(200).send(relationalByUser);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// };

module.exports = {
  // findSingleRelational,
  getAllRelationals,
  editRelational,
  deleteRelational,
  getRelationalsGivenUser,
};
