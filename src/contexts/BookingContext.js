import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import { booking } from '@api/booking';
const BookingContext = createContext({});

const BookingContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [specialistBookings, setSpecialistBookings] = useState([]);
  const { userData } = useAuthContext();

  const getSpecialistBooking = async (specialists) => {
    ////////////
    const ids = specialists.map((item) => item.id).join('_');
    const response = await booking.getSpecialistBooking(ids);
    setSpecialistBookings(response.data);
    return response.data;
  };
  const getStoreBooking = async (storeId, userId) => {
    const response = await booking.getStoreBooking(storeId, userId);
    return response;
  };

  const value = {
    selectedDate,
    setSelectedDate,
    getSpecialistBooking,
    specialistBookings,
    getStoreBooking,
  };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export default BookingContextProvider;

export const useBookingContext = () => useContext(BookingContext);
