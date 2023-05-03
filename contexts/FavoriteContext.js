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
    // Load the favorite items from localStorage when the component mounts
    const storedFavItems = localStorage.getItem("favItems");
    if (storedFavItems) {
      setFavItems(JSON.parse(storedFavItems));
    }
  }, []);

  useEffect(() => {
    // Save the favorite items to localStorage whenever they change
    localStorage.setItem("favItems", JSON.stringify(favItems));
  }, [favItems]);

  useEffect(() => {
    const newFavCount = favItems.reduce(
      (total, favItem) => total + favItem.quantity,
      0
    );
    setFavCount(newFavCount);
  }, [favItems]);

  const addItemToFav = (recipeToAdd) => {
    setFavItems(addFavItem(favItems, recipeToAdd));
  };

  const clearItemFromFav = (favItemToClear) => {
    setFavItems(clearFavItem(favItems, favItemToClear));
  };

  const value = {
    addItemToFav,
    clearItemFromFav,
    favItems,
    favCount,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};