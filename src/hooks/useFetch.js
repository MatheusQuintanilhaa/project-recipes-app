import { useEffect } from 'react';

function useFetch(url, callback, maxLength, key) {
  useEffect(() => {
    async function fetchUrl() {
      const response = await fetch(url);
      const data = await response.json();
      let arrayReduce = '';
      if (data[key]) {
        arrayReduce = data[key].filter((_element, index) => index < maxLength);
      }
      callback(arrayReduce);
    }
    fetchUrl();
  }, [url, callback, maxLength, key]);
}

export default useFetch;
