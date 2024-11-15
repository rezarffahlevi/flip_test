import React from 'react';
import MainNavigation from './src/routes/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AppStyles } from './src/themes/styles';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={AppStyles.container}>
      <MainNavigation />
    </SafeAreaView>
  );
}

export default App;
