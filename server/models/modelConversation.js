import mongoose from "mongoose";
 
const ConvSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("NewConversation", ConvSchema);

 export default Conversation; 
