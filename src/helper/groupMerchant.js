const groupMerchant = (merchant) => {
  const countedMerchant = merchant.reduce((allMerchantID, merchantName) => {
    if (merchantName in allMerchantID) {
      allMerchantID[merchantName]++; // eslint-disable-line
    } else {
      allMerchantID[merchantName] = 1; // eslint-disable-line
    }
    return allMerchantID;
  }, {});
  return countedMerchant;
};

module.exports = {
  groupMerchant,
};
