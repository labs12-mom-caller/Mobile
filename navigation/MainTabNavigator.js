
import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Dashboard from './../screens/Dashboard';
import LoginScreen from './../screens/auth/LoginScreen';

const RootStack = createStackNavigator(
  {
    Home: Dashboard,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class MainNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
