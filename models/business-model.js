const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    business_id: String,
    going_to: Number
});

const Business = mongoose.model("nightlife-app-businesses", businessSchema);

module.exports = Business;