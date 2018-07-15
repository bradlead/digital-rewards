const groupMerchant = (merchant) => {
  const countedMerchant = merchant.reduce((allMerchantID, merchantName) => {
    if (merchantName in allMerchantID) {
      allMerchantID[merchantName]++;
    } else {
      allMerchantID[merchantName] = 1;
    }
    return allMerchantID;
  }, {});
  return countedMerchant;
};

module.exports = {
  groupMerchant,
};
