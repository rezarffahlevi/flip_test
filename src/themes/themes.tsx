import {scaleWidth} from '@utils/responsive';
import {AppColors} from './colors';
import AppFontWeight from './fontWeight';
import AppFontSize from './fontSize';
import AppStyles  from './styles';

const AppThemes = {
  space: {
    XXS: scaleWidth(2),
    XS: scaleWidth(4),
    SM: scaleWidth(6),
    MD: scaleWidth(10),
    LG: scaleWidth(14),
    XL: scaleWidth(20),
    BOTTOM_SCROLL: scaleWidth(100),
  },
  colors: AppColors,
  fontWeight: AppFontWeight,
  fontSize: AppFontSize,
  style: AppStyles,
};

export default AppThemes;
