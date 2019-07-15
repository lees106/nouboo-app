//UNFINISHED

import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import SectionScreen from "../screens/SectionScreen";
import HomeScreen from "../screens/HomeScreen";
import CourseScreen from '../screens/CourseScreen';
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
import ForgotPassScreen from "../screens/ForgotPassScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

//Icons
import * as Icon from "@expo/vector-icons";

// const activeColor = "#4775f2";
// const inactiveColor = "#b8bece";
const activeColor = "#03dac6";
const inactiveColor = "#b8bece";

/************************************************************ */
//LOGIN SCREEN ITEMS
const AuthenicationNavigator = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
  Confirmation: ConfirmScreen,
  ForgotPass: ForgotPassScreen,
  ResetPass: ResetPasswordScreen
});

/************************************************************ */
//HOMESCREEN ITEMS
const HomeStack = createStackNavigator(
  {
    Homescreen: HomeScreen,
    Section: SectionScreen
  },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;

  // Will remove tab bar from section screen
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == "Section") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible: tabBarVisible,
    tabBarLabel: "Home",
    tabBarOptions: {
      activeTintColor: "#03dac6",
      inactiveTintColor: "#b8bece",
      style: {
        paddingTop: 10,
        height: 55,
        backgroundColor: "#212121"
      }
    },
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

/************************************************************ */
// COURSES ITEMS
const CoursesStack = createStackNavigator({
  Courses: CourseScreen
  },
  {
    mode: "modal"
  }
);

CoursesStack.navigationOptions = {
  tabBarLabel: "Course",
  tabBarOptions: {
    activeTintColor: "#03dac6",
    inactiveTintColor: "#b8bece",
    style: {
      paddingTop: 10,
      height: 55,
      backgroundColor: "#212121"
    }
  },
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

/************************************************************ */
// PROJECTS ITEMS
const ProjectsStack = createStackNavigator({
  Projects: SectionScreen
});

ProjectsStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

/************************************************************ */
// BOTTOM TAB BAR NAVIGATION
const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectsStack
});

/************************************************************ */
// This ensures that AuthenticationNavigator Screens will show up first
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthenicationNavigator,
      TabNavigator
    },
    {
      initialRouteName: "TabNavigator"
    }
  )
);
