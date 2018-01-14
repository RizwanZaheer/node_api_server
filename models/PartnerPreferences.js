const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerPreferencesSchema = new Schema({
  community: {
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
  education: {
    type: String,
    default: ""
  },
  fromAge: {
    type: Number,
    default: 0,
  },
  toAge: {
    type: Number,
    default: 0,
  },
  motherTongue: {
    type: String,
    default: ""
  },
  annualIncome: {
    type: String,
    default: ""
  },
  bodyType: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  weight: {
    type: String,
    default: ""
  },
  familyAffluence: {
    type: String,
    default: ""
  },
  healthInformation: {
    type: String,
    default: ""
  },
  skinTone: {
    type: String,
    default: ""
  },
  hairType: {
    type: String,
    default: ""
  },
  smoke: {
    type: String,
    default: '',
  },
  drink: {
    type: String,
    default: '',
  },
  bloodGroup: {
    type: String,
    default: '',
  },
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

const ModelClass = mongoose.model("partnerpreferences", partnerPreferencesSchema);
// Export Model Class
module.exports = ModelClass;
