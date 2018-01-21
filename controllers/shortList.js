const User = require("../models/Users");
const ShortList = require("../models/ShortList");

exports.getShortList = (req, res, next) => {
  const { id } = req.body;
  User.findOne({ _id: id })
    .then(user => {
      // if (err) return next(err);
      if (user) {
        res.send({
          success: true,
          user,
        });
      }
    })
    .catch(errors => console.log(errors));
};

exports.addUserInShortList = (req, res, next) => {
  const { profileId, userId } = req.body;
  ShortList.findOne({ _user: userId })
    .then(users => {
      if (users) {
        users.shortListUsers.push(profileId);
        console.log("users.shortListUsers: ", users.shortListUsers);
        ShortList.findOneAndUpdate(
          { _user: userId },
          {
            $set: {
              shortListUsers: users.shortListUsers,
            },
          },
          { new: true }
        ).set
          .then(doc => {
            if (doc) {
              return res.json({
                success: true,
                shortListUsers: doc,
              });
            }
            next();
          })
          .catch(err => console.log(err));
      } else {
        // if userid with not found then create new record and insert in shortlist table
        try {
          new ShortList({
            shortListUsers: profileId,
            _user: userId,
          })
            .save(err => {
              if (err) return next(err);
              // Respond to request indication the user was created
              res.send({ success: true, shortlist });
            })
            .then(save => {
              console.log("save: ", save);
            })
            .catch(err => console.log("save shortlist catch: ", err));
        } catch (error) {
          console.log("else catch error: ", error);
        }
      }
    })
    .catch(err => console.log("then catch occur:", err));
};
