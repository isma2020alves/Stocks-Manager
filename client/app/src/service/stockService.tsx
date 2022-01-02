import { useEffect, useState } from "react";
import axios from "axios";
import {IStock} from "../interfaces/IStocks"

function useGet(url: string): { data: IStock[]; loading: boolean; error: string; refetch: () => void; } {
  const [data, setData] = useState<IStock[]>(Object);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);

  useEffect(() => {
    setLoading(true);
    axios
      .get<IStock[]>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios
      .get<IStock[]>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default useGet;