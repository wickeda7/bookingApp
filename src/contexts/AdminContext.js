import { createContext, useEffect, useState, useContext } from 'react';
const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const deleteStaff = async (staffs) => {
    if (staffs.length === 0) return;
    setIsLoading(true);
    console.log('staffs2', staffs);
    // const response = await stores.deleteStaff(id);
    // setStaff(response);
  };

  const value = {
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
