import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date) {
  let hour = date.getHours().toString();
  const minute = date.getMinutes().toString();

  // add 0 if hour is less than 10
  if(+hour < 10) {
    hour = "0" + hour;
  }

  return `${hour}:${minute}`
}
