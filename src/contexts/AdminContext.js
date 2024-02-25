import { createContext, useEffect, useState, useContext } from 'react';
import { stores } from '@api/stores';
const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const getStaff = async (id) => {
    setIsLoading(true);
    const response = await stores.getStoreById(id);
    setStaff(response.employee);
    setServices(response.services);
    setImages(response.images);
    setIsLoading(false);
  };
  const selectStaff = (item) => {
    const newStaff = staff.map((i) => {
      if (i.id === item.id) {
        i.selected = !i.selected;
      }
      return i;
    });
    setStaff(newStaff);
  };

  const deleteStaff = async (staffs) => {
    if (staffs.length === 0) return;
    setIsLoading(true);
    console.log('staffs2', staffs);
    // const response = await stores.deleteStaff(id);
    // setStaff(response);
  };

  const value = {
    staff,
    setStaff,
    getStaff,
    services,
    setServices,
    images,
    setImages,
    selectStaff,
    deleteStaff,
    isLoading,
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
