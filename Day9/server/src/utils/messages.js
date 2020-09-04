const MessageModel = require("../models/messages");

const addMessage = async (message, sender, room) => {
  try {
    const newMessage = new MessageModel({ text: message, sender, room });
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    console.log(error);
  }
};

module.exports = addMessage;
