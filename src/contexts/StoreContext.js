import { createContext, useEffect, useState, useContext } from 'react';
import { users } from '@api/users';
import { stores as storeApi } from '@api/stores';
import { useAuthContext } from '@contexts/AuthContext';
const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState(null);
  const { userData, updateUserFavorite } = useAuthContext();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStores = async () => {
    const response = await storeApi.getData(userData?.favorites);
    setStores(response);
  };

  const updatedSelectedStore = (res) => {
    const updatedStore = { ...selectedStore, ...res };
    setSelectedStore(updatedStore);
    const newItem = stores.map((val) => {
      if (val.id === updatedStore.id) {
        const newVal = { ...val, ...updatedStore };

        return newVal;
      } else {
        return val;
      }
    });
    setStores(newItem);
  };
  const getStoreRelation = async (id) => {
    if (selectedStore.services) return;
    const response = await storeApi.getStoreById(selectedStore.id);
    updatedSelectedStore(response);
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
  const getReviews = async (id) => {
    if (!selectedStore) return;
    setLoading(true);
    console.log('selectedStore11111', selectedStore);
    const response = await storeApi.getReviews(selectedStore.id);
    setReviews(response.data);
    updatedSelectedStore({ reviews: response.data });
    setLoading(false);
  };
  const value = {
    selectedStore,
    setSelectedStore,
    stores,
    setStores,
    onFavorite,
    getStores,
    getStoreRelation,
    getReviews,
    reviews,
    loading,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;

export const useStoreContext = () => useContext(StoreContext);
