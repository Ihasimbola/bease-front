import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { toast } from "sonner";

// custom hook for showing error message or navigate(-1) for success
export function useFetcherEffect() {
  const fetcher = useFetcher();
  const navigate = useNavigate()

  useEffect(() => {
    if (fetcher?.data?.message) {
      toast.error(fetcher?.data?.message);
    } else if (fetcher.data === null) {
      toast.error("Une erreur est survenue");
      navigate(-1);
    } else if (!!fetcher?.data) {
      navigate(-1);
    }
  }, [fetcher?.data]);

  return { fetcher }
}