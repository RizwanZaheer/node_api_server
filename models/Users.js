const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");
const AddressSchema = require("./Address");

// const MAX_LOGIN_ATTEMPTS = 5;
// const LOCK_TIME = 2 * 60 * 60 * 1000;

const userSchema = new Schema({
  id: Number,
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: String,
  rejectedBy: [{ type: Schema.Types.ObjectId, default: "" }],
  gender: {
    type: String,
    trim: true,
    default: "",
  },
  fname: {
    type: String,
    trim: true,
    default: "",
  },
  lname: {
    type: String,
    trim: true,
    default: "",
  },
  city: {
    type: String,
    trim: true,
    default: "",
  },
  country: {
    type: String,
    trim: true,
    default: "",
  },
  province: {
    type: String,
    trim: true,
    default: "",
  },
  dob: {
    type: Date,
    default: Date.now(),
  },
  age: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  community: {
    type: String,
    trim: true,
    default: "",
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    trim: true,
    default: "",
  },
  religion: {
    type: String,
    trim: true,
    default: "",
  },
  education: {
    type: String,
    trim: true,
    default: "",
  },
  motherTongue: {
    type: String,
    trim: true,
    default: "",
  },
  annualIncome: {
    type: String,
    trim: true,
    default: "",
  },
  bodyType: {
    type: String,
    trim: true,
    default: "",
  },
  height: {
    type: String,
    trim: true,
    default: "",
  },
  weight: {
    type: String,
    trim: true,
    default: "",
  },
  familyAffluence: {
    type: String,
    trim: true,
    default: "",
  },
  healthInformation: {
    type: String,
    trim: true,
    default: "",
  },
  skinTone: {
    type: String,
    trim: true,
    default: "",
  },
  hairType: {
    type: String,
    trim: true,
    default: "",
  },
  aboutMySelf: {
    type: String,
    trim: true,
    default: "",
  },
  smoke: {
    type: String,
    trim: true,
    default: "",
  },
  drink: {
    type: String,
    trim: true,
    default: "",
  },
  bloodGroup: {
    type: String,
    trim: true,
    default: "",
  },
  // address: [AddressSchema],
  // googleId: {
  //   type: String,
  //   trim: true,
  //   default: ""
  // },
  // credits: {
  //   type: Number,
  //   default: 0
  // },
  // loginAttempts: { type: Number, required: true, default: 0 },
  // lockUntil: { type: Number },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  modifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

// userSchema.virtual('isLocked').get(function() {
//   // check for a future lockUntil timestamp
//   return !!(this.lockUntil && this.lockUntil > Date.now());
// });

// On save Hook, encrypt password
userSchema.pre("save", function(next) {
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // Otherwise hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
// User Schema Methods
// When new User is created then this
// func is everywhere can accessible
// arrow func didn't work here
userSchema.methods.comparePassword = function(candidatePssword, callback) {
  bcrypt.compare(candidatePssword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the Model class
const ModelClass = mongoose.model("user", userSchema);
// Export Model Class
module.exports = ModelClass;
