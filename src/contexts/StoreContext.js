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
  const [county, setCounty] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const getStores = async () => {
    setLoading(true);
    // const county = 'Los Angeles County';
    const type = 'nail';
    const response = await storeApi.getData(userData?.favorites, county, type);
    setStores(response);
    // setLoading(false);
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
    if (!stores) {
      users.updateFavorite(userData.id, item);
      return item;
    }
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
    setCounty,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;

export const useStoreContext = () => useContext(StoreContext);
