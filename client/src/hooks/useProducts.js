import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/products";

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const queryKey = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    let isMounted = true;
    const parsedParams = JSON.parse(queryKey);

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(parsedParams);

        if (isMounted) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || "Unable to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [queryKey]);

  return { products, loading, error };
};
