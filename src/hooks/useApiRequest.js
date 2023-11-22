import { useState } from "react";

function useApiRequest(fn) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const caller = async (...args) => {
    setError(null);
    setLoading(true);
    try {
      const result = await fn(...args);
      setData(() => result);
      setLoading(() => false);
      return result;
    } catch (e) {
      setLoading(() => false);
      setError(() => e);
      throw e;
    }
  };
  
  return [caller, { data, error, loading }];
}

export default useApiRequest;