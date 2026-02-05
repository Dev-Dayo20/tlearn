import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Custom storage implementation for Zustand
export const encryptedStorage = {
  getItem: (name: string): string | null => {
    const item = localStorage.getItem(name);
    if (!item) return null;

    try {
      const decrypted = decryptData(item);
      return decrypted;
    } catch (error) {
      console.error("Failed to decrypt storage item:", error);
      // If decryption fails, clear the corrupted data
      localStorage.removeItem(name);
      return null;
    }
  },

  setItem: (name: string, value: string): void => {
    try {
      const encrypted = encryptData(value);
      localStorage.setItem(name, encrypted);
    } catch (error) {
      console.error("Failed to encrypt storage item:", error);
    }
  },

  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};
