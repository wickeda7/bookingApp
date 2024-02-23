import { createContext, useEffect, useState, useContext } from 'react';
const WorkersContext = createContext({});
const WorkersContextProvider = ({ children }) => {
  const [calendar, setCalendar] = useState(true);
  const [graphView, setGraphView] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const value = {
    calendar,
    setCalendar,
    graphView,
    setGraphView,
    selectedDate,
    setSelectedDate,
  };
  return <WorkersContext.Provider value={value}>{children}</WorkersContext.Provider>;
};

export default WorkersContextProvider;
export const useWorkersContext = () => useContext(WorkersContext);
