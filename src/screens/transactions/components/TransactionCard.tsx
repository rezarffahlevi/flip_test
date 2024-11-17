import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../themes/colors';
import {currencyFormat} from '../../../utils/stringUtils';
import {AppStyles} from '../../../themes/styles';
import {formatDate} from '../../../utils/dateFormat';
import { AppThemes } from '../../../themes/themes';
import { TransferLabel } from './TransferLabel';
import { StatusLabel } from './StatusLabel';
import FontSize from '../../../themes/fontSize';

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
  return (
    <Pressable style={styles.container} onPress={onPress} disabled={disabled}>
      <View style={[styles.flagStatus, status == 'SUCCESS' && styles.flagSuccess] } />
      <View style={styles.wrapper}>
        <TransferLabel senderBank={senderBank} beneficiaryBank={beneficiaryBank} />
        <Text style={[FontSize.h4, styles.name]}>{beneficiaryName?.toUpperCase()}</Text>
        <View style={AppStyles.row}>
          <Text adjustsFontSizeToFit style={[FontSize.h5]}>{currencyFormat(amount)}</Text>
          <View style={styles.dot} />
          <Text style={[FontSize.h5]}>{formatDate(date)}</Text>
        </View>
      </View>
      <StatusLabel status={status} />
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
});
