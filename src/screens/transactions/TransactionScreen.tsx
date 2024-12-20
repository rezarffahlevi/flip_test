import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SORT_BY} from '@utils/constants';
import AppThemes from '@themes/themes';
import useFetchData from '@hooks/useFetchData';
import Shimmer from '@components/shimmer/Shimmer';

const SortModal = React.lazy(() => import('./components/SortModal'));
const Searchbar = React.lazy(() => import('./components/Searchbar'));
const TransactionCard = React.lazy(
  () => import('./components/TransactionCard'),
);

type Props = {};
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

type QueryParam = {
  sortBy: string;
  keyword: string;
};

const TransactionScreen: FC<Props> = ({}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {fetchData, data, error, loading, message} = useFetchData({
    urlPath: 'frontend-test',
  });
  const [showSorting, setShowSorting] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<QueryParam>({
    sortBy: '',
    keyword: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const getRenderedData = useCallback(
    (resData: any, queryParams: QueryParam) => {
      const arrayData: TransactionItem[] = Object.values(resData ?? {});
      let result = [...arrayData];
      // sorting
      switch (queryParams.sortBy) {
        case 'a-z':
          result.sort((a, b) =>
            a.beneficiary_name.localeCompare(b.beneficiary_name),
          );
          break;
        case 'z-a':
          result.sort((a, b) =>
            b.beneficiary_name.localeCompare(a.beneficiary_name),
          );
          break;
        case 'date-desc':
          result.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
          break;
        case 'date-asc':
          result.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
          break;
        default:
          result = Object.values(resData ?? {});
          break;
      }
      // filtering
      result = filterData(result, queryParams.keyword);
      return result;
    },
    [data, queryParams],
  );

  const filterData = useCallback(
    (searchData: TransactionItem[], keyword: string) => {
      if (keyword === '') return searchData;
      searchData = searchData.filter(
        item =>
          item.beneficiary_name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.beneficiary_bank.toLowerCase().includes(keyword.toLowerCase()) ||
          item.sender_bank.toLowerCase().includes(keyword.toLowerCase()) ||
          item.amount.toString().includes(keyword),
      );
      return searchData;
    },
    [data, queryParams],
  );

  const _onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const _onSearch = useCallback(
    (keyword: string) => {
      setQueryParams(prev => {
        return {...prev, keyword: keyword};
      });
    },
    [queryParams],
  );

  const _renderTransactionItem = ({item, index}: any) => {
    return (
      <TransactionCard
        amount={item.amount}
        beneficiaryBank={item.beneficiary_bank}
        beneficiaryName={item.beneficiary_name}
        date={item.created_at}
        disabled={item.disabled}
        senderBank={item.sender_bank}
        status={item.status}
        onPress={() => {
          navigation.navigate('TransactionDetail', {transaction: item});
        }}
      />
    );
  };

  const _renderEmptyComponent = useCallback(() => {
    if (error)
      return (
        <View style={styles.container}>
          <Text>{message}</Text>
        </View>
      );

    return <View />;
  }, [error, message]);

  return (
    <View style={styles.container}>
      <Searchbar
        onPressSorting={() => setShowSorting(true)}
        onSearch={_onSearch}
        keyword={queryParams.keyword}
        sortBy={SORT_BY.find(d => d.value == queryParams.sortBy)?.label}
      />
      <FlatList
        data={getRenderedData(data, queryParams) || []}
        renderItem={_renderTransactionItem}
        contentContainerStyle={styles.containerItem}
        keyExtractor={(item, index) => `trx-${index}-${item.id}`}
        ListFooterComponent={
          loading ? <Shimmer count={7} borderRadius={4} /> : null
        }
        ListFooterComponentStyle={styles.listFooter}
        onRefresh={_onRefresh}
        refreshing={false}
        ListEmptyComponent={_renderEmptyComponent}
      />
      <SortModal
        visible={showSorting}
        data={SORT_BY}
        onClose={() => setShowSorting(false)}
        onSelected={val =>
          setQueryParams(prev => {
            return {...prev, sortBy: val};
          })
        }
        selected={queryParams.sortBy}
      />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    padding: AppThemes.space.MD,
  },
  containerItem: {
    paddingTop: 0,
    paddingBottom: AppThemes.space.BOTTOM_SCROLL,
  },
  listFooter: {
    padding: 0,
    margin: 0,
  },
});
