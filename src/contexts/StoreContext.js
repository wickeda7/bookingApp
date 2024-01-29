import { createContext, useEffect, useState, useContext } from 'react';
import { users } from '@api/users';
import { stores as storeApi } from '@api/stores';
import { useAuthContext } from '@contexts/AuthContext';
const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState(null);
  const { userData, updateUserFavorite } = useAuthContext();

  const getStores = async () => {
    const response = await storeApi.getData(userData?.favorites);
    setStores(response);
  };

  const onFavorite = (item) => {
    const newItem = stores.map((val) => {
      if (val.id === item.id) {
        const newVal = { ...val, selected: !val.selected };
        users.updateFavorite(userData.id, newVal);
        return newVal;
      } else {
        return val;
      }
    });
    setStores(newItem);
    updateUserFavorite();
    return newItem;
  };

  const value = {
    selectedStore,
    setSelectedStore,
    stores,
    setStores,
    onFavorite,
    getStores,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;

export const useStoreContext = () => useContext(StoreContext);
