import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useDialog()  {
  const [ isOpen, setIsOpen ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) navigate(-1);
  }, [ isOpen ]);

  return { isOpen, setIsOpen }
}