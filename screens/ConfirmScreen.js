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
  return {
    username: state.username
  };
}

class ConfirmScreen extends React.Component {
  state = {
    fontsLoaded: false, // This is needed for the font to work
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),

    authCode: "", // Users will recieve a confirmation code
    fullname: "",
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

  componentDidUpdate() {
    if (this.state.username === "") {
      this.setState({ username: this.props.username });
      console.log(this.props.username);
    }
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

  handleConfirmSignUp = () => {
    const { username, authCode } = this.state;
    Auth.confirmSignUp(username, authCode)
      .then(() => {
        console.log("Confirm sign up successful");
        this.props.navigation.navigate("Login");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when entering confirmation code: ", err);
          Alert.alert("Error when entering confirmation code: ", err);
        } else {
          console.log("Error when entering confirmation code: ", err.message);
          Alert.alert("Error when entering confirmation code: ", err.message);
        }
      });
  };

  // Resend code if not received already
  handleResendCode = () => {
    const { username } = this.state;
    Auth.resendSignUp(username)
      .then(() => {
        console.log("Confirmation code resent successfully");
        Alert.alert("Confirmation code resent successfully");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error requesting new confirmation code: ", err);
          Alert.alert("Error requesting new confirmation code: ", err);
        } else {
          console.log("Error requesting new confirmation code: ", err.message);
          Alert.alert("Error requesting new confirmation code: ", err.message);
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
        <ConfirmScreenImage
          source={require("../assets/background-sign-up.png")}
        />
        <PasswordResetText>Confirmation</PasswordResetText>
        <InputFieldContainer>
          <TextInput
            onChangeText={authCode => this.setState({ authCode })}
            placeholder="Enter your code here"
            onFocus={this.focusEmail}
          />
          <IconEmail source={this.state.iconEmail} />
          <Text>Check your email for the code</Text>
        </InputFieldContainer>

        <ButtonsContainer>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            <SignUpButtonStyle>
              <SignUpButtonText>Go Back</SignUpButtonText>
            </SignUpButtonStyle>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleConfirmSignUp}>
            <LinearGradient
              colors={["#FF0000", "#6F03DB"]}
              style={LogInButtonStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <LogInButtonText>Confirm</LogInButtonText>
            </LinearGradient>
          </TouchableOpacity>
        </ButtonsContainer>
        <TouchableOpacity onPress={this.handleResendCode}>
          <ResendCode>Resend Code</ResendCode>
        </TouchableOpacity>
      </MainContainer>
    );
  }
}

export default connect(mapStateToProps)(ConfirmScreen);

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  font-family: "roboto-bold";
  flex: 1;
`;

const Text = styled.Text`
  position: absolute;
  font-size: 12px;
  color: white;
  left: 66px;
  top: 70px;
`;

const ConfirmScreenImage = styled.Image`
  position: absolute;
  width: 101%;
  height: 100%;
`;

const PasswordResetText = styled.Text`
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

const ResendCode = styled.Text`
  top: 40px;
  font-size: 12px;
  color: white;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  bottom: 15px;
  left: 31px;
`;
