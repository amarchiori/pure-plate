import { createContext, useState, useEffect } from 'react';

const addFavItem = (favItems, recipeToAdd) => {
  const existingFavItem = favItems.find(
    (favItem) => favItem.id === recipeToAdd.id
  );

  if (existingFavItem) {
    return favItems.map((favItem) =>
      favItem.id === recipeToAdd.id
        ? { ...favItem, quantity: favItem.quantity + 1 }
        : favItem
    );
  }

  return [...favItems, { ...recipeToAdd, quantity: 1 }];
};


const clearFavItem = (favItems, favItemToClear) =>
  favItems.filter((favItem) => favItem.id !== favItemToClear.id);

export const FavoriteContext = createContext({
  favItems: [],
  addItemToFav: () => {},
  clearItemFromFav: () => {},
  favCount: 0,
});

export const FavoriteProvider = ({ children }) => {
  const [favItems, setFavItems] = useState([]);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const newFavCount = favItems.reduce(
      (total, favItem) => total + favItem.quantity,
      0
    );
    setFavCount(newFavCount);
  }, [favItems]);

  const addItemToFav = (recipeToAdd) => {
    setFavItems(addFavItem(favItems, recipeToAdd));
    console.log(favItems)
  };

  const clearItemFromFav = (favItemToClear) => {
    setFavItems(clearFavItem(favItems, favItemToClear));
    console.log(favItems)
  };

  const value = {
    addItemToFav,
    clearItemFromFav,
    favItems,
    favCount,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};