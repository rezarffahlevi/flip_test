import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AppAssets} from '../../../assets/assets';
import {FontWeight} from '../../../themes/fontWeight';
import FontSize from '../../../themes/fontSize';
import {AppStyles} from '../../../themes/styles';
import {AppColors} from '../../../themes/colors';
import {FC} from 'react';
import {AppThemes} from '../../../themes/themes';

type Props = {
  onPressSorting: () => void;
};
export const Searchbar: FC<Props> = ({onPressSorting}: Props) => {
  return (
    <View style={styles.searchContainer}>
      <View style={[AppStyles.row, styles.search]}>
        <Image source={AppAssets.ic_search} style={styles.searchIcon} />
        <TextInput
          style={[styles.textInput, FontSize.h7]}
          placeholder="Cari nama, bank, atau nominal"
          placeholderTextColor={AppColors.grey}
          numberOfLines={1}
        />
      </View>
      <Pressable onPress={onPressSorting} style={[AppStyles.row, styles.sort]}>
        <Text style={[AppStyles.primary, FontSize.h7, FontWeight.bold]}>
          URUTKAN
        </Text>
        <Image source={AppAssets.ic_arrow_down} style={styles.arrowIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: AppColors.white,
    borderRadius: AppThemes.SPACE.SM,
    paddingHorizontal: AppThemes.SPACE.MD,
    paddingVertical: AppThemes.SPACE.MD + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: AppColors.grey,
  },
  textInput: {
    color: AppColors.black,
    marginLeft: 2,
    flex: 1,
  },
  search: {
    flex: 7,
  },
  sort: {
    flex: 3,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: AppColors.primary,
  },
});