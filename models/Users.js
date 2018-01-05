const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");
const AddressSchema = require("./Address");

// const MAX_LOGIN_ATTEMPTS = 5;
// const LOCK_TIME = 2 * 60 * 60 * 1000;

const userSchema = new Schema({
  id: Number,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  gender: {
    type: String,
    default: ""
  },
  fname: {
    type: String,
    default: ""
  },
  lname: {
    type: String,
    default: ""
  },
  dob: {
    type: Date
  },
  phone: {
    type: String,
    default: ""
  },
  caste: {
    type: String,
    default: '',
  },
  image: {
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
  mother_tongue: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  weight: {
    type: String,
    default: String
  },
  // address: [AddressSchema],
  // googleId: {
  //   type: String,
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
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  }
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
