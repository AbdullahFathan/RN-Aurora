import { useState, useEffect, useContext, createContext } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isHasLogin, setIsHasLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsHasLogin(true);
          setUser(res);
        } else {
          setIsHasLogin(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(`Eror at getCurrentUser ${error} `);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isHasLogin,
        setIsHasLogin,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
