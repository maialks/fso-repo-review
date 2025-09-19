import { createContext } from 'react';
import type { AuthStorage } from '../types';

const AuthStorageContext = createContext<null | AuthStorage>(null);

export default AuthStorageContext;
