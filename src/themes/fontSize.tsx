import {StyleSheet} from 'react-native';
import AppFontWeight from './fontWeight';
import {responsiveFont} from '../utils/responsive';

const AppFontSize = StyleSheet.create({
  h1: {fontSize: responsiveFont(32), lineHeight: 40, ...AppFontWeight.bold},
  h2: {fontSize: responsiveFont(28), lineHeight: 36, ...AppFontWeight.semibold},
  h3: {fontSize: responsiveFont(24), lineHeight: 32, ...AppFontWeight.semibold},
  h4: {fontSize: responsiveFont(20), lineHeight: 28, ...AppFontWeight.regular},
  h5: {fontSize: responsiveFont(18), lineHeight: 24, ...AppFontWeight.regular},
  h6: {fontSize: responsiveFont(16), lineHeight: 22, ...AppFontWeight.regular},
  h7: {fontSize: responsiveFont(14), lineHeight: 20, ...AppFontWeight.regular},
  h8: {fontSize: responsiveFont(12), lineHeight: 18, ...AppFontWeight.light},
});

export default AppFontSize;