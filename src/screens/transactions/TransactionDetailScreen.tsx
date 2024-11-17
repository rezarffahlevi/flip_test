import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Clipboard,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import AppThemes from '@themes/themes';
import AppAssets from '@assets/assets';
import AppStyles from '@themes/styles';
import {TransactionItem} from './TransactionScreen';
import {currencyFormat} from '@utils/stringUtils';
import {formatDate, formatDateTime} from '@utils/dateFormat';
import {scaleWidth} from '@utils/responsive';

const TransferLabel = React.lazy(() => import('./components/TransferLabel'));
const InfoLabel = React.lazy(() => import('./components/InfoLabel'));

type Props = StaticScreenProps<{
  transaction: TransactionItem;
}>;

const TransactionDetailScreen: FC<Props> = ({route}: Props) => {
  const {transaction} = route.params;
  const navigation = useNavigation();
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    if (transaction.status == 'SUCCESS') {
      navigation.setOptions({
        headerStyle: {backgroundColor: AppThemes.colors.secondary},
      });
    }
  }, [transaction.status]);

  const _onCopyId = useCallback(() => {
    // for demo purposes, because for this test I don't add any library except for navigation.
    // recomend to replace with @react-native-clipboard/clipboard
    Clipboard.setString(transaction.id);
    let msg = 'ID Transaksi berhasil disalin';
    if (Platform.OS == 'android') {
      ToastAndroid.show(msg, 3);
    } else {
      Alert.alert(msg);
    }
  }, []);

  const toggleAccordion = useCallback(() => setExpand(!expand), [expand]);
  const isSuccess = useMemo(
    () => transaction.status == 'SUCCESS',
    [transaction.status],
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[AppThemes.fontSize.h6, AppThemes.fontWeight.bold]}>
          ID TRANSAKSI: #{transaction.id}
        </Text>
        <TouchableOpacity onPress={_onCopyId}>
          <Image source={AppAssets.ic_copy} style={styles.iconCopy} />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.card, AppStyles.row, {justifyContent: 'space-between'}]}>
        <Text style={[AppThemes.fontSize.h6, AppThemes.fontWeight.bold]}>
          DETAIL TRANSAKSI
        </Text>
        <TouchableOpacity onPress={toggleAccordion} style={styles.toggle}>
          <Text
            style={[
              AppThemes.fontSize.h6,
              AppStyles.primary,
              AppThemes.fontWeight.semibold,
            ]}>
            {expand ? 'Tutup' : 'Lihat'}
          </Text>
        </TouchableOpacity>
      </View>
      {expand && (
        <View style={[styles.wrapper]}>
          <TransferLabel
            senderBank={transaction.sender_bank}
            beneficiaryBank={transaction.beneficiary_bank}
          />
          <View style={styles.content}>
            <InfoLabel
              title={transaction.beneficiary_name?.toUpperCase()}
              value={transaction.account_number}
            />
            <InfoLabel
              title={'NOMINAL'}
              value={currencyFormat(transaction.amount)}
            />
          </View>
          <View style={styles.content}>
            <InfoLabel title={'BERITA TRANSFER'} value={transaction.remark} />
            <InfoLabel
              title={'KODE UNIK'}
              value={transaction.unique_code?.toString()}
            />
          </View>
          <View style={styles.content}>
            <InfoLabel
              title={'WAKTU DIBUAT'}
              value={formatDate(transaction.created_at)}
            />
            <InfoLabel
              title={'BIAYA ADMIN'}
              value={currencyFormat(transaction.fee)}
            />
          </View>
          <View style={styles.content}>
            <InfoLabel
              title={'STATUS'}
              value={isSuccess ? 'Berhasil' : 'Pengecekan'}
              // valueStyle={[AppThemes.fontWeight.bold]}
            />
            {isSuccess && (
              <InfoLabel
                title={'WAKTU TRANSFER'}
                value={formatDateTime(transaction.completed_at)}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: AppThemes.space.MD,
  },
  card: {
    backgroundColor: AppThemes.colors.white,
    padding: AppThemes.space.XL,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  wrapper: {
    backgroundColor: AppThemes.colors.white,
    padding: AppThemes.space.XL,
  },
  iconCopy: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    tintColor: AppThemes.colors.primary,
    marginLeft: AppThemes.space.SM,
  },
  content: {
    flexDirection: 'row',
    marginVertical: AppThemes.space.MD,
  },
  toggle: {
    // paddingBlock: AppThemes.space.MD,
    paddingLeft: AppThemes.space.MD,
  },
});
