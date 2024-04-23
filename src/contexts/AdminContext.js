import { createContext, useEffect, useState, useContext } from 'react';
const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeServices, setStoreServices] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const value = {
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
    storeInfo,
    setStoreInfo,
    storeServices,
    setStoreServices,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
