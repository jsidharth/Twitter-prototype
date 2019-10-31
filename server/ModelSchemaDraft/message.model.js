import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    to: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    from: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    body: { type: String, required: true }
    },
    { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema)

export default Messages;