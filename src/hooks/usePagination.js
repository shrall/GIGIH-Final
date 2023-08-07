import { useState, useEffect } from "react";
import axios from "axios";

export default function usePagination(url) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.data;
        })
        .then((newData) => {
          setTotalPage(newData.totalPages);
          setData((prevData) => [...prevData, ...newData.data]);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }, 2000);
  }, [url]);

  return { data, totalPage, isLoading, error };
}
