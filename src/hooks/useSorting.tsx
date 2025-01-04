"use client";
import { useEffect, useState } from "react";

export function useSorting(key: string, defaultValue: boolean) {
  const [value, setValue] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const savedValue = localStorage.getItem(key) || defaultValue;
    setValue(savedValue === "true");
  }, [key, defaultValue]);

  const toggleValue = () => {
    const newValue = !value;
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, toggleValue] as const;
}
