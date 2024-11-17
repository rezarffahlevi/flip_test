import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppAssets from '@assets/assets';
import AppStyles from '@themes/styles';
import AppThemes from '@themes/themes';
import {debounce} from '@utils/utils';

type Props = {
  onPressSorting: () => void;
  onSearch: (keyword: string) => void;
  sortBy: string | undefined;
  keyword: string | undefined;
};
const Searchbar: FC<Props> = ({
  onPressSorting,
  onSearch,
  sortBy,
  keyword,
}: Props) => {
  const [text, setText] = useState<string>('');

  const handleSearch = useCallback(
    (text: string) => {
      setText(text);
      debounceSearch(text);
    },
    [text],
  );

  const debounceSearch = useCallback(
    debounce((nextValue: string) => onSearch(nextValue), 450),
    [],
  );

  return (
    <View style={styles.searchContainer}>
      <View style={[AppStyles.row, styles.search]}>
        <Image source={AppAssets.ic_search} style={styles.searchIcon} />
        <TextInput
          style={[styles.textInput, AppThemes.fontSize.h7]}
          placeholder="Cari nama, bank, atau nominal"
          placeholderTextColor={AppThemes.colors.grey}
          numberOfLines={1}
          onChangeText={handleSearch}
          value={text}
        />
      </View>
      <Pressable onPress={onPressSorting} style={[AppStyles.row, styles.sort]}>
        <Text
          style={[
            AppStyles.primary,
            AppThemes.fontSize.h7,
            AppThemes.fontWeight.bold,
          ]}>
          {sortBy}
        </Text>
        <Image source={AppAssets.ic_arrow_down} style={styles.arrowIcon} />
      </Pressable>
    </View>
  );
};

export default React.memo(Searchbar);

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: AppThemes.colors.white,
    borderRadius: AppThemes.space.SM,
    paddingRight: AppThemes.space.XS,
    paddingLeft: AppThemes.space.MD,
    paddingVertical: AppThemes.space.MD,
    marginBottom: AppThemes.space.MD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: AppThemes.colors.grey,
  },
  textInput: {
    color: AppThemes.colors.black,
    marginLeft: 2,
    flex: 1,
  },
  search: {
    flex: 7,
  },
  sort: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: AppThemes.colors.primary,
  },
});
