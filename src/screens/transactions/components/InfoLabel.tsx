import {Image, StyleSheet, Text, View} from 'react-native';
import {titleCase} from '../../../utils/stringUtils';
import FontSize from '../../../themes/fontSize';
import {AppAssets} from '../../../assets/assets';
import {FontWeight} from '../../../themes/fontWeight';

type Props = {
  title: string;
  value: string;
};
export const InfoLabel = ({title, value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[FontSize.h6, FontWeight.bold]}>{title}</Text>
      <Text style={[FontSize.h6, FontWeight.regular]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
