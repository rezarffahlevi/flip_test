import useFetchData from '../useFetchData';
export declare interface TransactionItem {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

export const useGetTrasaction = () => {
  const {fetchData, data, error, loading, isError, message, status} =
    useFetchData({urlPath: 'frontend-test'});

  let result: TransactionItem[] = [];
  if (data) {
    result = Object.values(data);
  }

  return {
    loading,
    error,
    isError,
    message,
    status,
    data: result,
    fetchData,
  };
};
