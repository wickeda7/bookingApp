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
  const updateStaffState = (data, method) => {
    console.log('updateStaffState data??????', data);
    if (method === 'put') {
      const newStaff = staff.map((i) => {
        if (i.id === data.id) {
          return data;
        }
        return i;
      });
      setStaff(newStaff);
      return newStaff;
    }
  };

  const value = {
    deleteStaff,
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
    updateStaffState,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
