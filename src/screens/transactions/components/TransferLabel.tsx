import {Image, StyleSheet, Text} from 'react-native';
import {titleCase} from '../../../utils/stringUtils';
import FontSize from '../../../themes/fontSize';
import {AppAssets} from '../../../assets/assets';
import {FontWeight} from '../../../themes/fontWeight';

type Props = {
  senderBank: string;
  beneficiaryBank: string;
};
export const TransferLabel = ({senderBank, beneficiaryBank}: Props) => {
  return (
    <Text style={[FontSize.h5, FontWeight.bold]}>
      {titleCase(senderBank)}{' '}
      <Image source={AppAssets.ic_right} style={styles.iconTf} />{' '}
      {titleCase(beneficiaryBank)}
    </Text>
  );
};

const styles = StyleSheet.create({
  iconTf: {
    width: 18,
    height: 14,
  },
});
