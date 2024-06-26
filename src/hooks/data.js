import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataFetching = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://',{
           email: 'johnviannie06@gmail.com'
          
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code here
    };
  }, [url, postData]); // Re-run effect whenever url or postData changes

  return { data, loading};
};

export default useDataFetching;