import { useState } from "react";

const storageKey = "savedState";

//todo: context
const useLocalStorage = (initialValue: string): [string, (newValue: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>((): string => {
    // load saved state in localStorage
    const savedState = localStorage.getItem(storageKey);
    return savedState ? savedState : initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value); // Save state
    localStorage.setItem(storageKey, value); // Save to local storage
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
