const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const businessSchema = new Schema({
    business_id: {type: String, index: true, unique: true},
    going: {type: Number, default: 0}
});

const Business = mongoose.model("nightlife-app-businesses", businessSchema);

module.exports = Business;