const Rewards = require('../models/reward');

const getRewards = (req, res) => {
  // return all rewards from db
  Rewards.find()
    .then((rewards) => {
      res.send(rewards);
    }).catch((err) => {
      /* eslint-disable-next-line no-console */
      console.log(err.message);
      res.sendStatus(400);
    });
};

const getRewardbyMerchant = (req, res, unfilteredGroup) => {
  console.log('getRewardbyMerchant: ', unfilteredGroup);
  // return all rewards from db
  Rewards.find({ merchant_id: { $in: [unfilteredGroup] } }).each((err, merchant) => {
    if (merchant === Rewards.merchant_id) {
    // random code
    } else {
      return (null, unfilteredGroup);
    }
  })
    .then(() => {
      res.status(201).json(unfilteredGroup);
    });
};

module.exports = {
  getRewards,
  getRewardbyMerchant,
};

// https://docs.mongodb.com/manual/reference/operator/query/in/
// https://stackoverflow.com/questions/48255659/node-js-mongoose-find
// https://docs.mongodb.com/manual/reference/method/db.collection.find/
// https://stackoverflow.com/questions/19249722/using-the-db-collection-find-query-in-a-sub-document

// https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
// db.collection("users").find( {_id: {$in: userIds}} ).each(function(err, user) {
//   if (err) callback( err, list);
//   else {
//       if (user && user._id) {
//           users[user._id].userName = user.fName;
//           users[user._id].userPhotoUrl = user.userPhotoUrl;
//       } else {                        // end of list
//           callback( null, list );
//       }
//   }
// });

// https://www.discovermeteor.com/blog/understanding-javascript-map/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
