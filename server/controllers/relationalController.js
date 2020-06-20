const { RelationalModel } = require("../models/relationalModel");

// Relational Creation
const createRelational = async (request, response) => {
  try {
    console.log("POST RELATIONAL ENTRY");
    let relationalInstance = new RelationalModel(request.body);
    console.log(relationalInstance);
    const createdRelational = await RelationalModel.create(relationalInstance);
    response.send(createdRelational);
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
    response.status(200).send(relationalInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Relationals - Find One by query
const findSingleRelational = async (request, response) => {
  try {
    console.log("GET ONE CLIMBSPOT");
    let relational = await RelationalModel.findOne(request.query);
    response.status(200).send(relational);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  findSingleRelational,
  getAllRelationals,
  createRelational,
  editRelational,
  deleteRelational,
};
