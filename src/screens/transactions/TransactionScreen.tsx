import {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TransactionCard} from '../../components/card/TransactionCard';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Searchbar} from './components/Searchbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SortModal} from './components/SortModal';
import {useGetTrasaction} from '../../hooks/services/useTransactionService';
import Shimmer from '../../components/shimmer/Shimmer';
import { SORT_BY } from '../../utils/constants';
import { AppThemes } from '../../themes/themes';

type Props = {};

const TransactionScreen: FC<Props> = ({}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {data, error, loading, message, fetchData} = useGetTrasaction();
  const [showSorting, setShowSorting] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

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
  return (
    <View style={styles.container}>
      <Searchbar onPressSorting={() => setShowSorting(true)} />
      <FlatList
        data={data || []}
        renderItem={_renderTransactionItem}
        contentContainerStyle={styles.containerItem}
        ListFooterComponent={loading ? <Shimmer count={7} borderRadius={4} /> : null}
        ListFooterComponentStyle={styles.listFooter}
        onRefresh={() => fetchData()}
        refreshing={false}
      />
      <SortModal
        visible={showSorting}
        data={SORT_BY}
        onClose={() => setShowSorting(false)}
        onSelected={val => setSortBy(val)}
        selected={sortBy}
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
