import {StyleSheet, Text} from 'react-native';
import AppThemes from '@themes/themes';
import React from 'react';

type Props = {
  status: string;
  style?: React.CSSProperties | {},
};
const StatusLabel = ({status, style}: Props) => {
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

  return <Text style={[_labelStatus(status), style]}>{_statusWording(status)}</Text>;
};

export default React.memo(StatusLabel);

const styles = StyleSheet.create({
  successText: {
    borderRadius: AppThemes.space.SM,
    paddingHorizontal: AppThemes.space.MD,
    paddingVertical: AppThemes.space.XXS,
    backgroundColor: AppThemes.colors.secondary,
    color: AppThemes.colors.white,
    fontWeight: 'bold',
    marginRight: AppThemes.space.MD,
    position: 'absolute',
    right: 0,
  },
  pendingText: {
    borderColor: AppThemes.colors.primary,
    borderWidth: 2,
    borderRadius: AppThemes.space.SM,
    paddingHorizontal: AppThemes.space.MD,
    paddingVertical: AppThemes.space.XXS,
    color: AppThemes.colors.black,
    fontWeight: 'bold',
    marginRight: AppThemes.space.MD,
    position: 'absolute',
    right: 0,
  },
});
