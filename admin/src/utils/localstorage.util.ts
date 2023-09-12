export const LocalstorageUtil = {
  // Set in localstorage
  setLocalStorage(key: string, value: any) {
    if (window !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  // Remove from localstorage
  removeLocalStorage(key: string) {
    if (window !== undefined) {
      localStorage.removeItem(key);
    }
  },
  getLocalStorage(key: string) {
    if (typeof window !== undefined) {
      const localData = localStorage.getItem(key);
      if (localData !== null) {
        return JSON.parse(localData);
      } else {
        return null;
      }
    }
  },
};
