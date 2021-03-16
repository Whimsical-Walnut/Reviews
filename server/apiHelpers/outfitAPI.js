const outfit = [];

module.exports = {
  getAllOutfits: (callback) => {
    callback(null, outfit);
  },
  saveAnOutfit: (newOutfit, callback) => {
    outfit.unshift(newOutfit);
    callback(null, outfit);
  },
  deleteAnOutfit: (productID, callback) => {
    let index;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < outfit.length; i++) {
      if (outfit[i].styles.product_id === productID) {
        index = i;
      }
    }
    outfit.splice(index, 1);
    callback(null, outfit);
  },
};
