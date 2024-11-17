import { AppThemes } from '@themes/themes';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  value: string;
  valueStyle?: React.CSSProperties | {};
};
export const InfoLabel = ({title, value, valueStyle}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[AppThemes.fontSize.h5, AppThemes.fontWeight.bold]}>{title}</Text>
      <Text style={[AppThemes.fontSize.h5, AppThemes.fontWeight.regular, valueStyle]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
