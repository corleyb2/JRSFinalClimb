const { ClimbModel } = require("../models/climbModel");

// Climb Creation
const createClimb = async (request, response) => {
  try {
    console.log("POST CLIMBSPOT");
    let climbInstance = new ClimbModel(request.body);
    console.log("******instance!", climbInstance);
    const createdClimb = await ClimbModel.create(climbInstance);
    console.log("***createdClimb4$$###", createdClimb);
    response.send(createdClimb);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Delete Climb (query string)
const deleteClimb = async (request, response) => {
  try {
    console.log("DELETE CLIMBSPOT", request);

    let deleteClimbInstance = await ClimbModel.deleteOne(request.query);
    console.log(deleteClimbInstance);
    response.send(deleteClimbInstance);
  } catch (error) {
    console.log("the Catch", error);
    response.status(500).send(error);
  }
};

// Edit Climb
const editClimb = async (request, response) => {
  try {
    console.log("UPDATE CLIMBSPOT");
    let updatedClimb = await ClimbModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedClimb);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Climbs- All
const getAllClimbs = async (request, response) => {
  try {
    console.log("GET ALL CLIMBSPOTS");
    let climbInstances = await ClimbModel.find({});
    response.status(200).send(climbInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Climbs - Find One by query
const findSingleClimb = async (request, response) => {
  try {
    console.log("GET ONE CLIMBSPOT");
    let climb = await ClimbModel.findOne(request.query);
    response.status(200).send(climb);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  findSingleClimb,
  getAllClimbs,
  createClimb,
  editClimb,
  deleteClimb,
};
