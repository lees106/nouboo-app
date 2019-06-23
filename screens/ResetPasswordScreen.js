import React from "react";
import styled from "styled-components";
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
  return {
    username: state.username
  };
}

class ResetPasswordScreen extends React.Component {
  state = {
    fontsLoaded: false, // This is needed for the font to work
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),

    authCode: "",
    username: "",
    email: "",
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

    StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    if (this.state.username === "") {
      this.setState({ username: this.props.username });
      console.log(this.props.username);
    }
  }

  handleAuthCode = () => {
    const { username, authCode, newPassword } = this.state;
    Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate("Login");
        console.log("the New password submitted successfully");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error while confirming the new password: ", err);
          Alert.alert("Error while confirming the new password: ", err);
        } else {
          console.log("Error while confirming the new password: ", err.message);
          Alert.alert("Error while confirming the new password: ", err.message);
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
        <ResetPasswordScreenImage
          source={require("../assets/background-sign-up.png")}
        />
        <PasswordResetText>Password Reset</PasswordResetText>
        <InputFieldContainer>
          <TextInput
            onChangeText={authCode => this.setState({ authCode })}
            placeholder="Confirm Code"
          />
          <TextInput
            onChangeText={newPassword => this.setState({ newPassword })}
            placeholder="New Password"
            secureTextEntry={true}
          />
        </InputFieldContainer>
        <ButtonsContainer>
          <TouchableOpacity onPress={this.handleAuthCode}>
            <LinearGradient
              colors={["#FF0000", "#6F03DB"]}
              style={LogInButtonStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <LogInButtonText>Done</LogInButtonText>
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

export default connect(mapStateToProps)(ResetPasswordScreen);

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  font-family: "roboto-bold";
  flex: 1;
`;

const ResetPasswordScreenImage = styled.Image`
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
  padding-left: 15px;
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
