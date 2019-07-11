import React from "react";
import styled from "styled-components";

// FONT
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { LinearGradient } from "expo-linear-gradient";
import { Alert, TouchableOpacity, StatusBar } from "react-native";

// AWS Amplify
import Auth from "@aws-amplify/auth";

// Redux
import { connect } from "react-redux";

// Redux
function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name
      })
  };
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontsLoaded: false, // This is needed for the font to work
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),

    // AWS
    username: "",
    password: ""
  };

  // Removes the header off the top of screen
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    Font.loadAsync({
      "roboto-bold": require("../assets/fonts/Roboto-Regular.ttf")
    }).then(() => this.setState({ fontsLoaded: true }));

    StatusBar.setBarStyle("dark-content", true); // Changes the status bar color to dark-content or light-content
  }

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif")
    });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(user => {
        this.setState({ user });
        this.props.updateName(username); // Uses redux to update username
        this.props.navigation.navigate("Homescreen");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing in: ", err);
          Alert.alert("Error when signing in: ", err);
        } else {
          console.log("Error when signing in: ", err.message);
          Alert.alert("Error when signing in: ", err.message);
        }
      });
  };
  render() {
    /***  This is needed for the font to work  ***/
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    /*********************************************/

    return (
      <MainContainer>
        <LoginScreenImage
          source={require("../assets/background-login-2.png")}
        />
        <LogoText>noubo</LogoText>
        <InputFieldContainer>
          <TextInput
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ForgotPass")}
          >
            <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
          </TouchableOpacity>

          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
        </InputFieldContainer>

        <ButtonsContainer>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            <SignUpButtonStyle>
              <SignUpButtonText>Sign Up</SignUpButtonText>
            </SignUpButtonStyle>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleLogin}>
            <LinearGradient
              colors={["#FF0000", "#6F03DB"]}
              style={LogInButtonStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <LogInButtonText>Log In</LogInButtonText>
            </LinearGradient>
          </TouchableOpacity>
        </ButtonsContainer>
      </MainContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  font-family: "roboto-bold";
  flex: 1;
`;

const LoginScreenImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 200px;
`;

const LogoText = styled.Text`
  position: absolute;
  font-size: 40px;
  color: #7f02c1;
  top: 100px;
`;

const InputFieldContainer = styled.View`
  position: absolute;
  top: 175px;
`;

const TextInput = styled.TextInput`
  border: 2px solid #7f02c1;
  background-color: white;
  width: 295px;
  height: 44px;
  border-radius: 22px;
  font-size: 16px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 70px;
`;

const ForgotPasswordText = styled.Text`
  position: absolute;
  font-size: 12px;
  color: #085a89;
  left: 100px;
  top: 14px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  position: absolute;
  top: 380px;
`;

const SignUpButtonStyle = styled.View`
  border: 2px solid #7f02c1;
  background: white;
  width: 110px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  margin-right: 8px;
`;

const LogInButtonStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 110,
  height: 44,
  borderRadius: 22,
  marginLeft: 8
};

const LogInButtonText = styled.Text`
  color: white;
  font-size: 16;
`;

const SignUpButtonText = styled.Text`
  color: #7f02c1;
  font-size: 16;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  bottom: 79px;
  left: 31px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  bottom: 12px;
  left: 35px;
`;
