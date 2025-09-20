import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorageContext = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorageContext;
