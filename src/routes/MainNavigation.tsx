import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from '../screens/transactions/TransactionScreen';
import {createStaticNavigation} from '@react-navigation/native';
import TransactionDetailScreen from '../screens/transactions/TransactionDetailScreen';
import { AppColors } from '../themes/colors';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Transaction',
  screenOptions: {
    statusBarStyle: 'light',
    headerStyle:{
      backgroundColor: AppColors.primary, 
    },
    headerTitleStyle: {color: AppColors.white},
    headerTintColor: AppColors.white,
    animation: 'slide_from_left'
  },
  screens: {
    Transaction: {
      screen: TransactionScreen,
      options: {
        title: 'Transaksi'
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
const MainNavigation = createStaticNavigation(RootStack);
export default MainNavigation;
