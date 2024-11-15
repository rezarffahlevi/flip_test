import {StyleSheet} from 'react-native';
import { AppColors } from './colors';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  textInput: {
    color: AppColors.grey,
  },
  primary: {
    color: AppColors.primary,
  },
  content: {},
});
