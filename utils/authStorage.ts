import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'access_token';

export const authStorage = {
  async saveToken(token: string) {
    if (Platform.OS === 'web') {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  },

  async getToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
      return sessionStorage.getItem(TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    }
  },

  async removeToken() {
    if (Platform.OS === 'web') {
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  }
};