import { useEffect, useState } from "react";

export function useDebounce(delay = 500) {
  const [ data, setData ] = useState(null);
  const [ dataQuery, setDataQuery ] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setData(dataQuery), delay);
    return () => clearTimeout(timeout);
  }, [ dataQuery, delay ]);

  return [ data, setDataQuery ];
}