import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: { type: String, required: [true, "List name is mandatory"] },
    description: { type: String, default: "" },
    private: {type: Number, default: 0},    // 0 - Public, 1 - Private
    members: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    },
    { timestamps: true }
);

const Lists = mongoose.model("Lists", listSchema)

export default Lists;