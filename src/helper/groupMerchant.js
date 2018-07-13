const groupMerchant = (merchant) => {
  const countedMerchant = merchant.reduce((allMerchantID, merchantName) => {
    if (merchantName in allMerchantID) {
      allMerchantID[merchantName] + 1;
    } else {
      allMerchantID[merchantName] = 1;
    }
    return allMerchantID;
  }, {});
  return countedMerchant;
};

module.exports = groupMerchant;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// https://docs.mongodb.com/manual/reference/method/db.collection.find/
// https://www.discovermeteor.com/blog/understanding-javascript-map/
// https://stackoverflow.com/questions/19249722/using-the-db-collection-find-query-in-a-sub-document
