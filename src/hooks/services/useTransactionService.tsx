import useFetchData from '../useFetchData';
export const useGetTrasaction = () => {
  let {fetchData, data, error, loading, isError, message, status} = useFetchData({urlPath: 'frontend-test'});

  if (data) {
    data = Object.values(data);
  }

  return {
    loading,
    error,
    isError,
    message,
    status,
    data: data,
    fetchData,
  };
};
