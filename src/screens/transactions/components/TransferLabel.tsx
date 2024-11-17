import {Image, StyleSheet, Text, View} from 'react-native';
import {titleCase} from '../../../utils/stringUtils';
import FontSize from '../../../themes/fontSize';
import {AppAssets} from '../../../assets/assets';
import {FontWeight} from '../../../themes/fontWeight';
import {AppThemes} from '../../../themes/themes';
import {scaleWidth} from '../../../utils/responsive';
import { AppStyles } from '../../../themes/styles';

type Props = {
  senderBank: string;
  beneficiaryBank: string;
};
export const TransferLabel = ({senderBank, beneficiaryBank}: Props) => {
  return (
    <View style={AppStyles.row}>
      <Text style={[FontSize.h4, FontWeight.bold]} adjustsFontSizeToFit>
        {titleCase(senderBank)}
      </Text>
      <Image source={AppAssets.ic_right} style={styles.iconTf}/>
      <Text style={[FontSize.h4, FontWeight.bold]} adjustsFontSizeToFit>
        {titleCase(beneficiaryBank)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconTf: {
    width: scaleWidth(16),
    height: scaleWidth(16),
    marginHorizontal: AppThemes.SPACE.SM,
  },
});
