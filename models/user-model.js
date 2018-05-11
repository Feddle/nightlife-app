const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    twitter_id: String,
    going_to: [String]
});

const User = mongoose.model("nightlife-app-users", userSchema);


module.exports = User;
