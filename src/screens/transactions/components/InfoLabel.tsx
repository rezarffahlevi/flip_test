import AppThemes from '@themes/themes';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title: string;
  value: string;
  valueStyle?: React.CSSProperties | {};
};
const InfoLabel = ({title, value, valueStyle}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[AppThemes.fontSize.h6, AppThemes.fontWeight.bold]}>{title}</Text>
      <Text style={[AppThemes.fontSize.h6, AppThemes.fontWeight.regular, valueStyle]}>{value}</Text>
    </View>
  );
};

export default React.memo(InfoLabel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
