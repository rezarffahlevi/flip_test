import {FC, useEffect, useState} from 'react';
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
import {AppColors} from '../../themes/colors';
import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {AppThemes} from '../../themes/themes';
import FontSize from '../../themes/fontSize';
import {FontWeight} from '../../themes/fontWeight';
import {AppAssets} from '../../assets/assets';
import {AppStyles} from '../../themes/styles';
import {TransferLabel} from './components/TransferLabel';
import {TransactionItem} from './TransactionScreen';
import {InfoLabel} from './components/InfoLabel';
import {currencyFormat} from '../../utils/stringUtils';
import {formatDate, formatDateTime} from '../../utils/dateFormat';
import {scaleWidth} from '../../utils/responsive';

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
        headerStyle: {backgroundColor: AppColors.secondary},
      });
    }
  }, []);

  const _onCopyId = () => {
    // for demo purposes, because for this test I don't add any library except for navigation.
    // recomend to replace with @react-native-clipboard/clipboard
    Clipboard.setString(transaction.id);
    let msg = 'ID Transaksi berhasil disalin';
    if (Platform.OS == 'android') {
      ToastAndroid.show(msg, 3);
    } else {
      Alert.alert(msg);
    }
  };

  const toggleAccordion = () => setExpand(!expand);
  const isSuccess = transaction.status == 'SUCCESS';
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[FontSize.h5, FontWeight.bold]} adjustsFontSizeToFit>
          ID TRANSAKSI: #{transaction.id}
        </Text>
        <TouchableOpacity onPress={_onCopyId}>
          <Image source={AppAssets.ic_copy} style={styles.iconCopy} />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.card, AppStyles.row, {justifyContent: 'space-between'}]}>
        <Text style={[FontSize.h5, FontWeight.bold]} adjustsFontSizeToFit>
          DETAIL TRANSAKSI
        </Text>
        <TouchableOpacity onPress={toggleAccordion} style={styles.toggle}>
          <Text
            style={[FontSize.h5, AppStyles.primary, FontWeight.semibold]}
            adjustsFontSizeToFit>
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
              // valueStyle={[FontWeight.bold]}
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
    paddingVertical: AppThemes.SPACE.MD,
  },
  card: {
    backgroundColor: AppColors.white,
    padding: AppThemes.SPACE.XL,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  wrapper: {
    backgroundColor: AppColors.white,
    padding: AppThemes.SPACE.XL,
  },
  iconCopy: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    tintColor: AppColors.primary,
    marginLeft: AppThemes.SPACE.SM,
  },
  content: {
    flexDirection: 'row',
    marginVertical: AppThemes.SPACE.MD,
  },
  toggle: {
    // paddingBlock: AppThemes.SPACE.MD,
    paddingLeft: AppThemes.SPACE.MD,
  },
});
