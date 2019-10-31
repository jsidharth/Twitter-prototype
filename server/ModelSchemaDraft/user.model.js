import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: [true, "Name is mandatory"] },
    email: { type: String, required: [true, "Email is mandatory"] },
    password: { type: String, required: [true, "Password is mandatory"] },
    dob: { type: Date, required: true },
    profilePic: { type: String, default: "" },
    bio: {type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    handle: {type: String, required: true },
    active: { type: Number, default: 1},
    
    followers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Users" }],

    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweets" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "Tweets" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Tweets" }],

    ownedLists: [{ type: Schema.Types.ObjectId, ref: "Lists" }],
    subscribedLists: [{ type: Schema.Types.ObjectId, ref: "Lists" }],

    views: [{ date: { type: Date, required: true }, count_views: {type: Number, default: 0} }]
    },
    { timestamps: true }
);

const Users = mongoose.model("Users", userSchema)

export default Users;