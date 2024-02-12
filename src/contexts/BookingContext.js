import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import { useStoreContext } from '@contexts/StoreContext';
import { booking } from '@api/booking';
const BookingContext = createContext({});

const BookingContextProvider = ({ children }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [specialistBookings, setSpecialistBookings] = useState([]);
  const { selectedStore } = useStoreContext();
  const { userData } = useAuthContext();

  const getSpecialistBooking = async (specialists) => {
    const ids = specialists.map((item) => item.id).join('_');
    const response = await booking.getSpecialistBooking(ids);
    setSpecialistBookings(response.data);
    return response.data;
  };

  const getUserBooking = async () => {
    if (!userData) {
      console.log('need to login');
    } else {
      const response = await booking.getUserBooking(userData.id);
      return response.data;
    }
  };

  const confirmBooking = async () => {
    const data = {
      data: {
        timeslot: selectedTime,
        services: JSON.stringify(services),
        date: selectedDate.dateString,
        store: selectedStore.id,
        client: userData.id,
        specialist: selectedSpecialist.id,
        userID: userData.id,
        specialistID: selectedSpecialist.id,
        storeID: selectedStore.id,
      },
    };

    try {
      const response = await booking.post(data);
      return response;
    } catch (error) {
      console.log('error confirmBooking', error);
    }

    // do something
  };
  const value = {
    selectedSpecialist,
    setSelectedSpecialist,
    services,
    setServices,
    selectedTime,
    setSelectedTime,
    selectedDate,
    setSelectedDate,
    confirmBooking,
    getSpecialistBooking,
    specialistBookings,
    getUserBooking,
  };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export default BookingContextProvider;

export const useBookingContext = () => useContext(BookingContext);
