import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {currencyFormat} from '@utils/stringUtils';
import AppStyles  from '@themes/styles';
import {formatDate} from '@utils/dateFormat';
import AppThemes from '@themes/themes';

const TransferLabel = React.lazy(() => import('./TransferLabel'));
const StatusLabel = React.lazy(() => import('./StatusLabel'));

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

const TransactionCard: FC<Props> = ({
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
      <View
        style={[styles.flagStatus, status == 'SUCCESS' && styles.flagSuccess]}
      />
      <View style={styles.wrapper}>
        <TransferLabel
          senderBank={senderBank}
          beneficiaryBank={beneficiaryBank}
        />
        <Text style={[AppThemes.fontSize.h4, styles.name]}>
          {beneficiaryName?.toUpperCase()}
        </Text>
        <View style={AppStyles.row}>
          <Text adjustsFontSizeToFit style={[AppThemes.fontSize.h5]}>
            {currencyFormat(amount)}
          </Text>
          <View style={styles.dot} />
          <Text style={[AppThemes.fontSize.h5]}>{formatDate(date)}</Text>
        </View>
      </View>
      <StatusLabel status={status} />
    </Pressable>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: AppThemes.space.MD,
    borderRadius: AppThemes.space.MD,
    paddingLeft: 24,
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    paddingBlock: AppThemes.space.MD,
  },
  flagStatus: {
    width: 7,
    height: '100%',
    borderTopLeftRadius: AppThemes.space.MD,
    borderBottomLeftRadius: AppThemes.space.MD,
    backgroundColor: AppThemes.colors.primary,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  flagSuccess: {
    backgroundColor: AppThemes.colors.secondary,
  },
  iconTf: {
    width: 18,
    height: 14,
  },
  dot: {
    height: AppThemes.space.SM,
    width: AppThemes.space.SM,
    borderRadius: AppThemes.space.MD,
    backgroundColor: AppThemes.colors.black,
    marginInline: AppThemes.space.SM,
  },
  name: {
    marginBlock: AppThemes.space.XS,
  },
});
