import {StyleSheet} from 'react-native';
import {FontWeight} from './fontWeight';
import {responsiveFont} from '../utils/responsive';

export const FontSize = StyleSheet.create({
  h1: {fontSize: responsiveFont(32), lineHeight: 40, ...FontWeight.bold},
  h2: {fontSize: responsiveFont(28), lineHeight: 36, ...FontWeight.semibold},
  h3: {fontSize: responsiveFont(24), lineHeight: 32, ...FontWeight.semibold},
  h4: {fontSize: responsiveFont(20), lineHeight: 28, ...FontWeight.regular},
  h5: {fontSize: responsiveFont(18), lineHeight: 24, ...FontWeight.regular},
  h6: {fontSize: responsiveFont(16), lineHeight: 22, ...FontWeight.regular},
  h7: {fontSize: responsiveFont(14), lineHeight: 20, ...FontWeight.regular},
  h8: {fontSize: responsiveFont(12), lineHeight: 18, ...FontWeight.light},
});

export default FontSize;
