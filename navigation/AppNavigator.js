import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

///this is the code that makes the navigation happen

const IntroStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen
});

const MainStack = createSwitchNavigator({
  intro: { screen: IntroStack },
  main: { screen: MainTabNavigator }
});

const AppContainer = createAppContainer(MainStack);

export default class RootNavigation extends React.Component {
  render() {
    return <AppContainer />;
  }
}
