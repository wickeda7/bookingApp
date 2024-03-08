import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import { booking } from '@api/booking';
const BookingContext = createContext({});

const BookingContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [specialistBookings, setSpecialistBookings] = useState([]);
  const { userData } = useAuthContext();
  const [cancelBooking, setCancelBooking] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  const getSpecialistBooking = async (specialists) => {
    const ids = specialists.map((item) => item.id).join('_');
    const response = await booking.getSpecialistBooking(ids);
    setSpecialistBookings(response.data);
    return response.data;
  };
  const getStoreBooking = async (storeId, userId) => {
    const response = await booking.getStoreBooking(storeId, userId);
    return response;
  };

  const deleteHistory = async (id) => {
    console.log('deleteHistory', id);
    const response = await booking.deleteHistory(id);
    return response;
  };
  const getUserBooking = async (done, type) => {
    if (!userData) {
      console.log('need to login');
    } else {
      const response = await booking.getUserBooking(userData.id, done, type);
      return response.data;
    }
  };

  const value = {
    selectedDate,
    setSelectedDate,
    getSpecialistBooking,
    specialistBookings,
    getUserBooking,
    deleteHistory,
    cancelBooking,
    setCancelBooking,
    cancelId,
    setCancelId,
    getStoreBooking,
  };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export default BookingContextProvider;

export const useBookingContext = () => useContext(BookingContext);
