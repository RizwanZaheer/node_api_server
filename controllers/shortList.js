const User = require("../models/Users");
const ShortList = require("../models/ShortList");

const getShortList = (req) => new Promise((resolve, reject) => {
  const { id } = req.body;
  ShortList.findOne({ _user: id }).populate({
    path: 'shortListUsers', select: 'fname lname image age city country provice height weight religion'
  }).select("shortListUsers.fname")
    .then(user => {
      if (user) {
        resolve({
          success: true,
          user: user.shortListUsers,
        });
      }
    })
    .catch(err => reject({ message: err }));
});

const addUserInShortList = (req, res, next) => new Promise((resolve, rej) => {
  const { profileId, userId } = req.body;
  ShortList.findOne({ _user: userId })
    .then(users => {
      if (users) {
        const isPresent = users.shortListUsers.indexOf(profileId);
        if (isPresent === -1) {
          users.shortListUsers.push(profileId);
          ShortList.findOneAndUpdate(
            { _user: userId },
            {
              $set: {
                shortListUsers: users.shortListUsers,
              },
            },
            { new: true }
          )
            .then(doc => {
              if (doc) {
                return resolve({
                  success: true,
                  message: "Member Successfuly Added in your Short List!",
                  shortListUsers: doc,
                });
              }
              // next();
            })
            .catch(err => reject({ message: err }));
        } else
          return resolve({
            success: true,
            message: "Member is Already in your Short List!",
            shortListUsers: users,
          });
      } else {
        // if userid with not found then create new record and insert in shortlist table
        try {
          const shortlist = new ShortList({
            shortListUsers: profileId,
            _user: userId,
          });
          shortlist.save(err => {
            if (err) return reject({message: err});
            return resolve({
              success: true,
              message: "Member Successfuly Added in your Short List!",
              shortlist,
            });
          });
        } catch (err) {
          return reject({message: err});
        }
      }
    })
    .catch(err => reject({message: err}));
});

module.exports = {
  getShortList, addUserInShortList
}