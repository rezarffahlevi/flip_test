import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStaticNavigation} from '@react-navigation/native';
import TransactionDetailScreen from '@screens/transactions/TransactionDetailScreen';
import TransactionScreen from '@screens/transactions/TransactionScreen';
import { AppThemes } from '@themes/themes';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Transaction',
  screenOptions: {
    statusBarStyle: 'light',
    headerStyle:{
      backgroundColor: AppThemes.colors.primary, 
    },
    headerTitleStyle: {color: AppThemes.colors.white},
    headerTintColor: AppThemes.colors.white,
    animation: 'slide_from_left'
  },
  screens: {
    Transaction: {
      screen: TransactionScreen,
      options: {
        headerShown: false
      }
    },
    TransactionDetail: {
      screen: TransactionDetailScreen,
      options: {
        title: 'Transaksi Detail'
      }
    }
  },
});

export default createStaticNavigation(RootStack);
