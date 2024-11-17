import {Image, StyleSheet, Text, View} from 'react-native';
import {titleCase} from '@utils/utils';
import AppAssets from '@assets/assets';
import AppThemes from '@themes/themes';
import {scaleWidth} from '@utils/responsive';
import AppStyles  from '@themes/styles';
import React from 'react';

type Props = {
  senderBank: string;
  beneficiaryBank: string;
};
const TransferLabel = ({senderBank, beneficiaryBank}: Props) => {
  return (
    <View style={AppStyles.row}>
      <Text
        style={[AppThemes.fontSize.h5, AppThemes.fontWeight.bold]}
       >
        {titleCase(senderBank)}
      </Text>
      <Image source={AppAssets.ic_right} style={styles.iconTf} />
      <Text
        style={[AppThemes.fontSize.h5, AppThemes.fontWeight.bold]}
       >
        {titleCase(beneficiaryBank)}
      </Text>
    </View>
  );
};
export default React.memo(TransferLabel);

const styles = StyleSheet.create({
  iconTf: {
    width: scaleWidth(16),
    height: scaleWidth(16),
    marginHorizontal: AppThemes.space.SM,
  },
});
