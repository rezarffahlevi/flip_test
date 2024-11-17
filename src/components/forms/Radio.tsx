import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import AppThemes from '@themes/themes';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};
export const Radio: FC<Props> = ({label, selected, onPress}: Props) => {
  return (
    <Pressable style={styles.radioContainer} onPress={onPress}>
      <View style={styles.radioIcon}>{selected && (<View style={styles.radioIconSelected}/>)}</View>
      <Text>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    width: 16,
    height: 16,
    borderRadius: AppThemes.space.MD,
    backgroundColor: AppThemes.colors.white,
    borderColor: AppThemes.colors.primary,
    borderWidth: 2,
    marginRight: AppThemes.space.MD,
    marginBlock: AppThemes.space.MD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIconSelected: {
    width: 8,
    height: 8,
    borderRadius: AppThemes.space.MD,
    backgroundColor: AppThemes.colors.primary,
  },
});
