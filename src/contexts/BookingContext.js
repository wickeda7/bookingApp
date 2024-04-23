import { createContext, useEffect, useState, useContext } from 'react';
const BookingContext = createContext({});

const BookingContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const value = {
    selectedDate,
    setSelectedDate,
  };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export default BookingContextProvider;

export const useBookingContext = () => useContext(BookingContext);
