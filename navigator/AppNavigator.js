import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import ForgotPassScreen from "../screens/ForgotPassScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import ConfirmScreen from "../screens/ConfirmScreen.js";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
  Confirmation: ConfirmScreen,
  ForgotPass: ForgotPassScreen,
  ResetPass: ResetPasswordScreen,

  Homescreen: HomeScreen
});
export default createAppContainer(AppNavigator);

// Use below for tab bar navigator
//export default createAppContainer(TabNavigator);
