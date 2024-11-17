import {StyleSheet, Text} from 'react-native';
import { AppThemes } from '../../../themes/themes';
import { AppColors } from '../../../themes/colors';

type Props = {
  status: string;
  style?: React.CSSProperties | {},
};
export const StatusLabel = ({status, style}: Props) => {
  const _labelStatus = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return styles.successText;
      default:
        return styles.pendingText;
        break;
    }
  };

  const _statusWording = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Berhasil';
      default:
        return 'Pengecekan';
        break;
    }
  };

  return <Text style={[_labelStatus(status), style]} adjustsFontSizeToFit>{_statusWording(status)}</Text>;
};

const styles = StyleSheet.create({
  successText: {
    borderRadius: AppThemes.SPACE.SM,
    paddingHorizontal: AppThemes.SPACE.MD,
    paddingVertical: AppThemes.SPACE.XXS,
    backgroundColor: AppColors.secondary,
    color: AppColors.white,
    fontWeight: 'bold',
    marginRight: AppThemes.SPACE.MD,
    position: 'absolute',
    right: 0,
  },
  pendingText: {
    borderColor: AppColors.primary,
    borderWidth: 2,
    borderRadius: AppThemes.SPACE.SM,
    paddingHorizontal: AppThemes.SPACE.MD,
    paddingVertical: AppThemes.SPACE.XXS,
    color: AppColors.black,
    fontWeight: 'bold',
    marginRight: AppThemes.SPACE.MD,
    position: 'absolute',
    right: 0,
  },
});
