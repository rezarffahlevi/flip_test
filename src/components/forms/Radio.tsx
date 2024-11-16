import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../themes/colors';
import {FC} from 'react';
import { AppThemes } from '../../themes/themes';

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
    borderRadius: AppThemes.SPACE.MD,
    backgroundColor: AppColors.white,
    borderColor: AppColors.primary,
    borderWidth: 2,
    marginRight: AppThemes.SPACE.MD,
    marginBlock: AppThemes.SPACE.MD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIconSelected: {
    width: 8,
    height: 8,
    borderRadius: AppThemes.SPACE.MD,
    backgroundColor: AppColors.primary,
  },
});
