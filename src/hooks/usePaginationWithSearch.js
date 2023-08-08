import { useState, useEffect } from "react";
import axios from "axios";

export default function usePagination(url, newSearchTerm) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
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
        if (searchTerm == newSearchTerm) {
          setData((prevData) => [...prevData, ...newData.data]);
        } else {
          setData(newData.data);
        }
        setSearchTerm(newSearchTerm);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, newSearchTerm]);

  return { data, totalPage, isLoading, error };
}
