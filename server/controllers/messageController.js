import { MessageModel } from "../models/messageModel";

//POST
const createMessage = app.post("/message", async (request, response) => {
  try {
    console.log("POST MESSAGE");
    let messageInstance = new MessageModel(request.body);
    console.log(messageInstance);
    const createdMessage = await MessageModel.create(messageInstance);
    response.send(createdMessage);
  } catch (error) {
    response.status(500).send(error);
  }
});

//DELETE(query string)
const deleteMessage = app.delete("/message", async (request, response) => {
  try {
    console.log("DELETE MESSAGE");
    let deleteMessageInstance = await MessageModel.deleteOne(request.query);
    console.log(deleteMessageInstance);
    response.send(deleteMessageInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

// EDIT
const editMessage = app.put("/message", async (request, response) => {
  try {
    console.log("UPDATE MESSAGE");
    let updatedMessage = await MessageModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedMessage);
  } catch (error) {
    response.status(500).send(error);
  }
});

//GET REQUESTS
// Messages - All
const getAllMessages = app.get("/messages", async (request, response) => {
  try {
    console.log("GET MESSAGES");
    let messageInstances = await UserModel.find({});
    response.status(200).send(messageInstances);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Message - Find One by query
const findOneMessage = app.get("/message", async (request, response) => {
  try {
    console.log("GET ONE MESSAGE");
    let message = await MessageModel.findOne(request.query);
    response.status(200).send(message);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = {
  getAllMessages,
  findOneMessage,
  deleteMessage,
  createMessage,
  editMessage,
};
