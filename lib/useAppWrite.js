import { useEffect, useState } from "react";

export const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoadig, setIsLoadig] = useState(false);

  const fetchData = async () => {
    setIsLoadig(true);
    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      Alert.alert("Eror", error.message);
    } finally {
      setIsLoadig(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoadig, data, fetchData };
};
