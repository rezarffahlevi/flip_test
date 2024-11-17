import {StyleSheet, Text, View} from 'react-native';
import FontSize from '../../../themes/fontSize';
import {FontWeight} from '../../../themes/fontWeight';

type Props = {
  title: string;
  value: string;
  valueStyle?: React.CSSProperties | {};
};
export const InfoLabel = ({title, value, valueStyle}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[FontSize.h5, FontWeight.bold]}>{title}</Text>
      <Text style={[FontSize.h5, FontWeight.regular, valueStyle]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
