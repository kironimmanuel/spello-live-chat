import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SELECT_CHAT } from '../constants/actions';
import { auth } from '../services/firebase';
import reducer from './reducer';

export const initialState = {
  chatId: 'null',
  user: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showBigSidebar, setShowBigSidebar] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    setShowBigSidebar((prevShowBigSidebar) => !prevShowBigSidebar);
  };

  const selectChat = (selectedContact) => {
    dispatch({ type: SELECT_CHAT, payload: { selectedContact, currentUser } });
  };

  useEffect(() => {
    const authentication = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    // Cleanup necassary
    return () => {
      authentication();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        showBigSidebar,
        toggleSidebar,
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        currentUser,
        setCurrentUser,
        initialState,
        selectChat,
        state,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
