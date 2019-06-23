import React from "react";
import styled from "styled-components";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, TouchableOpacity, StatusBar } from "react-native";

// Redux
import { connect } from "react-redux";

// AWS Amplify
import Auth from "@aws-amplify/auth";

// Redux
function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUsername: username =>
      dispatch({
        type: "UPDATE_USERNAME",
        username
      })
  };
}

class SignUpScreen extends React.Component {
  state = {
    fontsLoaded: false, // This is needed for the font to work
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    iconPhoneNumber: require("../assets/icon-phone-inactive.png"),
    iconFullName: require("../assets/icon-name-inactive.png"),
    iconUserName: require("../assets/icon-username-inactive.png"),

    // AWS Amplify
    name: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: ""
  };

  // Removes the header off the top of screen
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    Font.loadAsync({
      "roboto-bold": require("../assets/fonts/Roboto-Regular.ttf")
    }).then(() => this.setState({ fontsLoaded: true }));

    StatusBar.setBarStyle("light-content", true);
  }

  focusFullname = () => {
    this.setState({
      iconFullName: require("../assets/icon-avatar-active.png"),
      iconPhoneNumber: require("../assets/icon-phone-inactive.png"),
      iconUserName: require("../assets/icon-username-inactive.png"),
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPhoneNumber = () => {
    this.setState({
      iconFullName: require("../assets/icon-avatar-inactive.png"),
      iconPhoneNumber: require("../assets/icon-phone-active.png"),
      iconUserName: require("../assets/icon-username-inactive.png"),
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusUsername = () => {
    this.setState({
      iconFullName: require("../assets/icon-avatar-inactive.png"),
      iconPhoneNumber: require("../assets/icon-phone-inactive.png"),
      iconUserName: require("../assets/icon-username-active.png"),
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusEmail = () => {
    this.setState({
      iconFullName: require("../assets/icon-avatar-inactive.png"),
      iconPhoneNumber: require("../assets/icon-phone-inactive.png"),
      iconUserName: require("../assets/icon-username-inactive.png"),
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

  // Sign up user with AWS Amplify Auth
  handleSignUp = () => {
    //this.setState({ isLoading: true });

    const { name, username, password, email, phoneNumber } = this.state;
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber;
    const preferred_username = username;

    Auth.signUp({
      username,
      email,
      password,
      attributes: { email, phone_number, preferred_username, name }
    })
      .then(() => {
        console.log("Sign up successful!");
        this.props.navigation.navigate("Confirmation");
        this.props.updateUsername(username); // Uses redux to update username
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing up1: ", err);
          Alert.alert("Error when signing up2: ", err);
        } else {
          console.log("Error when signing up3: ", err.message);
          Alert.alert("Error when signing up4: ", err.message);
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
        <SignUpScreenImage
          source={require("../assets/background-sign-up.png")}
        />
        <WelcomeText>Welcome</WelcomeText>
        <InputFieldContainer>
          <TextInput
            onChangeText={name => this.setState({ name })}
            placeholder="Full Name"
            onFocus={this.focusFullname}
          />
          <TextInput
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            placeholder="Phone Number"
            onFocus={this.focusPhoneNumber}
          />
          <TextInput
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            onFocus={this.focusUsername}
          />
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconFullName source={this.state.iconFullName} />
          <IconPhoneNumber source={this.state.iconPhoneNumber} />
          <IconUserName source={this.state.iconUserName} />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
        </InputFieldContainer>

        <ButtonsContainer>
          <TouchableOpacity onPress={this.handleSignUp}>
            <LinearGradient
              colors={["#FF0000", "#6F03DB"]}
              style={LogInButtonStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <LogInButtonText>Sign Up</LogInButtonText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <BackToLoginText>Back to login</BackToLoginText>
          </TouchableOpacity>
        </ButtonsContainer>
      </MainContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  font-family: "roboto-bold";
  flex: 1;
`;

const SignUpScreenImage = styled.Image`
  position: absolute;
  width: 101%;
  height: 100%;
`;

const WelcomeText = styled.Text`
  position: absolute;
  font-size: 40px;
  color: #ffffff;
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
  margin-top: 10px;
  padding-left: 70px;
`;

const ButtonsContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100px;
`;

const LogInButtonStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 44,
  borderRadius: 22
};

const LogInButtonText = styled.Text`
  color: white;
  font-size: 16;
`;

const BackToLoginText = styled.Text`
  font-size: 12px;
  color: #4344d9;
  top: 14px;
`;

const IconFullName = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  bottom: 230px;
  left: 31px;
`;

const IconPhoneNumber = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  bottom: 171px;
  left: 35px;
`;

const IconUserName = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  bottom: 119px;
  left: 35px;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  bottom: 68px;
  left: 31px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  bottom: 11px;
  left: 35px;
`;
