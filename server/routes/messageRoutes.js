const path = require("path");

const {
  getAllMessages,
  findOneMessage,
  deleteMessage,
  createMessage,
  editMessage,
} = require("../controllers/messageController");

const messageRoutes = (app) => {
  app
    .route("/message")
    .post(createMessage)
    .get(findOneMessage)
    .put(editMessage)
    .delete(deleteMessage);

  app.route("/messages").get(getAllMessages);
};

module.exports = { messageRoutes };
