const { UserModel } = require("../models/userModel");

//POST
const createUser = async (request, response) => {
  try {
    console.log("POST USER");
    let userInstance = new UserModel(request.body);
    console.log(userInstance);
    const createdUser = await UserModel.create(userInstance);
    response.send(createdUser);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
};

//DELETE(query string)
const deleteUser = async (request, response) => {
  try {
    console.log("DELETE USER");
    let deleteUserInstance = await UserModel.deleteOne(request.query);
    console.log(deleteUserInstance);
    response.send(deleteUserInstance);
  } catch (error) {
    response.status(500).send(error);
  }
};

// EDIT
const editUser = async (request, response) => {
  try {
    console.log("UPDATE USER");
    let updatedUser = await UserModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedUser);
  } catch (error) {
    response.status(500).send(error);
  }
};

//GET REQUESTS
// Users- All
const getAllUsers = async (request, response) => {
  try {
    console.log("GET USERS");
    let userInstances = await UserModel.find({});
    response.status(200).send(userInstances);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Users - Find One by query
const findOneUser = async (request, response) => {
  try {
    console.log("GET ONE USER");
    let user = await UserModel.findOne(request.query);
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = { getAllUsers, findOneUser, deleteUser, createUser, editUser };
