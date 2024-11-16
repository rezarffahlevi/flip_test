import {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../themes/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase, StaticScreenProps} from '@react-navigation/native';
import useFetchData from '../../hooks/useFetchData';
import { AppThemes } from '../../themes/themes';

type Props = StaticScreenProps<{
  transaction: any;
}>;

const TransactionDetailScreen: FC<Props> = ({route}: Props) => {
  const {fetchData, data, error, message} = useFetchData({urlPath: 'frontend-test'});
  useEffect(() => {
    fetchData();
  }, [])
  
  if(error) {
    return <Text>{message}</Text>;
  }
  return <View style={styles.container}></View>;
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: AppThemes.SPACE.MD,
  },
});
