import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {AppColors} from '../../../themes/colors';
import {FC} from 'react';
import { Radio } from '../../../components/forms/Radio';
import { AppThemes } from '../../../themes/themes';
type Props = {
  visible: boolean;
  selected: string | null;
  onSelected: (value: any) => void;
  onClose: () => void;
  data: {label: string; value: string | number}[];
};

export const SortModal: FC<Props> = ({
  visible,
  data,
  selected,
  onSelected,
  onClose,
}: Props) => {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <View
        style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />
        <View
          style={styles.card}>
          {data.map((item: any, i: number) => (
            <Radio key={`sort-${i}`} label={item.label} selected={selected == item.value} onPress={() => {
              onSelected(item.value);
              onClose();
            }} />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  card: {
    backgroundColor: AppColors.white,
    width: '80%',
    minHeight: 20,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: AppThemes.SPACE.MD,
  }
});
