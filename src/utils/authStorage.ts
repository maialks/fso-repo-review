import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthStorage as AuthStorageInterface } from '../types';

class AuthStorage implements AuthStorageInterface {
  namespace: string;

  constructor(namespace = 'accessToken') {
    this.namespace = namespace;
  }

  async getAcessToken() {
    const token = await AsyncStorage.getItem(`auth:${this.namespace}`);
    return token;
  }

  async setAcessToken(token: string) {
    await AsyncStorage.setItem(`auth:${this.namespace}`, token);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`auth:${this.namespace}`);
  }
}

export default AuthStorage;
