import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../themes/colors';
import {AppAssets} from '../../../assets/assets';
import {titleCase, currencyFormat} from '../../../utils/stringUtils';
import {AppStyles} from '../../../themes/styles';
import {formatDate} from '../../../utils/dateFormat';
import FontSize from '../../../themes/fontSize';
import {FontWeight} from '../../../themes/fontWeight';
import { AppThemes } from '../../../themes/themes';

type Props = {
  senderBank: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  amount: number;
  date: string;
  status: string;
  onPress: () => void;
  disabled: boolean;
};

export const TransactionCard: FC<Props> = ({
  senderBank,
  beneficiaryBank,
  beneficiaryName,
  amount,
  date,
  status,
  onPress,
  disabled,
}) => {
  const _labelStatus = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return styles.successText;
      default:
        return styles.pendingText;
        break;
    }
  };

  const _statusWording = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Berhasil';
      default:
        return 'Pengecekan';
        break;
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPress} disabled={disabled}>
      <View style={[styles.flagStatus, status == 'SUCCESS' && styles.flagSuccess] } />
      <View style={styles.wrapper}>
        <Text style={[FontSize.h5, FontWeight.bold]}>
          {titleCase(senderBank)}{' '}
          <Image source={AppAssets.ic_right} style={styles.iconTf} />{' '}
          {titleCase(beneficiaryBank)}
        </Text>
        <Text style={styles.name}>{beneficiaryName?.toUpperCase()}</Text>
        <View style={AppStyles.row}>
          <Text adjustsFontSizeToFit>{currencyFormat(amount)}</Text>
          <View style={styles.dot} />
          <Text>{formatDate(date)}</Text>
        </View>
      </View>
      <Text style={_labelStatus(status)}>{_statusWording(status)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: AppThemes.SPACE.MD,
    borderRadius: AppThemes.SPACE.MD,
    paddingLeft: 24,
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    paddingBlock: AppThemes.SPACE.MD,
  },
  flagStatus: {
    width: 7,
    height: '100%',
    borderTopLeftRadius: AppThemes.SPACE.MD,
    borderBottomLeftRadius: AppThemes.SPACE.MD,
    backgroundColor: AppColors.primary,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  flagSuccess: {
    backgroundColor: AppColors.secondary,
  },
  iconTf: {
    width: 18,
    height: 14,
  },
  dot: {
    height: AppThemes.SPACE.SM,
    width: AppThemes.SPACE.SM,
    borderRadius: AppThemes.SPACE.MD,
    backgroundColor: AppColors.black,
    marginInline: AppThemes.SPACE.SM,
  },
  name: {
    marginBlock: AppThemes.SPACE.XS,
  },
  successText: {
    borderRadius: AppThemes.SPACE.SM,
    paddingHorizontal: AppThemes.SPACE.MD,
    paddingVertical: AppThemes.SPACE.SM,
    backgroundColor: AppColors.secondary,
    color: AppColors.white,
    fontWeight: 'bold',
    marginRight: AppThemes.SPACE.MD,
    position: 'absolute',
    right: 0,
  },
  pendingText: {
    borderColor: AppColors.primary,
    borderWidth: 2,
    borderRadius: AppThemes.SPACE.SM,
    paddingHorizontal: AppThemes.SPACE.MD,
    paddingVertical: AppThemes.SPACE.XS,
    color: AppColors.black,
    fontWeight: 'bold',
    marginRight: AppThemes.SPACE.MD,
    position: 'absolute',
    right: 0,
  },
});
