const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const partnerPreferencesSchema = new Schema({
  age: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: ""
  },
  religion: {
    type: String,
    default: ""
  },
  community: { type: Number, default: 0 },
  mother_tongue: { type: Number, default: 0 },
  // _user is use to create a relationship btw partnerPreferences list and user
  // means which user made which partnerPreferences
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("partnerpreferences", partnerPreferencesSchema);
