import React, {FC} from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from '../screens/transactions/TransactionScreen';
import {createStaticNavigation} from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Transaction',
  screenOptions: {
    statusBarStyle: 'light',
    headerShown: false,
  },
  screens: {
    Transaction: {
      screen: TransactionScreen,
    },
  },
});
const MainNavigation = createStaticNavigation(RootStack);
export default MainNavigation;
