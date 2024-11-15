import {StyleSheet} from 'react-native';
import { FontWeight } from './fontWeight';

export const FontSize = StyleSheet.create({
  h1: { fontSize: 32, lineHeight: 40, ...FontWeight.bold },
  h2: { fontSize: 28, lineHeight: 36, ...FontWeight.semibold },
  h3: { fontSize: 24, lineHeight: 32, ...FontWeight.regular },
  h4: { fontSize: 20, lineHeight: 28, ...FontWeight.regular },
  h5: { fontSize: 18, lineHeight: 24, ...FontWeight.light },
  h6: { fontSize: 16, lineHeight: 22, ...FontWeight.light },
  h7: { fontSize: 14, lineHeight: 20, ...FontWeight.light },
  h8: { fontSize: 12, lineHeight: 18, ...FontWeight.light },
});

export default FontSize;
