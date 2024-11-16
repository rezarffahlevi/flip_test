import {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TransactionCard} from '../../components/card/TransactionCard';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Searchbar} from './components/Searchbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SortModal} from './components/SortModal';
import Shimmer from '../../components/shimmer/Shimmer';
import {REQ_STATUS, SORT_BY} from '../../utils/constants';
import {AppThemes} from '../../themes/themes';
import useFetchData from '../../hooks/useFetchData';

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
  const {fetchData, data, error, loading, isError, message, status} =
    useFetchData({urlPath: 'frontend-test'});
  const [showSorting, setShowSorting] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<QueryParam>({
    sortBy: '',
    keyword: '',
  });
  const [trx, setTrx] = useState<TransactionItem[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setTrx(Object.values(data));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getData();
    }
  }, [queryParams]);

  const getData = useCallback(() => {
    let sortedData = [...trx];
    switch (queryParams.sortBy) {
      case 'a-z':
        sortedData.sort((a, b) =>
          a.beneficiary_name.localeCompare(b.beneficiary_name),
        );
        break;
      case 'z-a':
        sortedData.sort((a, b) =>
          b.beneficiary_name.localeCompare(a.beneficiary_name),
        );
        break;
      case 'date-desc':
        sortedData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case 'date-asc':
        sortedData.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      default:
        sortedData = Object.values(data);
        break;
    }
    let result = searching(sortedData);

    setTrx(result);
  }, [queryParams, trx, data]);

  const searching = useCallback(
    (searchData: TransactionItem[]) => {
      if (queryParams.keyword === '') return searchData;
      searchData = searchData.filter(
        item =>
          item.beneficiary_name
            .toLowerCase()
            .includes(queryParams.keyword.toLowerCase()) ||
          item.beneficiary_bank
            .toLowerCase()
            .includes(queryParams.keyword.toLowerCase()) ||
          item.sender_bank
            .toLowerCase()
            .includes(queryParams.keyword.toLowerCase()) ||
          item.amount.toString().includes(queryParams.keyword),
      );
      return searchData;
    },
    [queryParams.keyword],
  );

  const _onRefresh = () => {
    setTrx([]);
    setQueryParams({keyword: '', sortBy: ''});
    fetchData();
  };

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

  const _renderEmptyComponent = () => {
    if (error)
      return (
        <View style={styles.container}>
          <Text>{message}</Text>
        </View>
      );

    return <View />;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        onPressSorting={() => setShowSorting(true)}
        onSearch={val =>
          setQueryParams(prev => {
            if (val === '') {
              setTrx(Object.values(data));
            }
            return {...prev, keyword: val};
          })
        }
        keyword={queryParams.keyword}
        sortBy={SORT_BY.find(d => d.value == queryParams.sortBy)?.label}
      />
      <FlatList
        data={trx || []}
        renderItem={_renderTransactionItem}
        contentContainerStyle={styles.containerItem}
        keyExtractor={(item, index) => `trx-${index}-${item.id}`}
        ListFooterComponent={
          (loading || (trx.length < 1 && (queryParams.keyword == ''))) ? <Shimmer count={7} borderRadius={4} /> : null
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
    padding: AppThemes.SPACE.MD,
  },
  containerItem: {
    paddingTop: AppThemes.SPACE.MD,
    paddingBottom: AppThemes.SPACE.BOTTOM_SCROLL,
  },
  listFooter: {
    padding: 0,
    margin: 0,
  },
});
