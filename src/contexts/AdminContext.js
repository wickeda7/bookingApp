import { createContext, useEffect, useState, useContext } from 'react';
import { stores } from '@api/stores';
const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const getStaff = async (id) => {
    const response = await stores.getStoreById(id);
    setStaff(response.employee);
    setServices(response.services);
    setImages(response.images);
  };
  const value = { staff, setStaff, getStaff, services, setServices, images, setImages };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
