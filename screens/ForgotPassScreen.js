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

class ForgotPassScreen extends React.Component {
  state = {
    fontsLoaded: false, // This is needed for the font to work
    iconUserName: require("../assets/icon-username-inactive.png"),

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

  focusUsername = () => {
    this.setState({
      iconUserName: require("../assets/icon-username-active.png")
    });
  };
  // Request a new password
  handleForgotPassword = () => {
    const { email } = this.state;

    const username = email;

    Auth.forgotPassword(username)
      .then(data => {
        console.log("New code sent", data);
        this.props.navigation.navigate("ResetPass");
        this.props.updateUsername(username); // Uses redux to update username
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error while setting up the new password: ", err);
          Alert.alert("Error while setting up the new password: ", err);
        } else {
          console.log("Error while setting up the new password: ", err.message);
          Alert.alert("Error while setting up the new password: ", err.message);
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
        <ForgotPassScreenImage
          source={require("../assets/background-sign-up.png")}
        />
        <PasswordResetText>Password Reset</PasswordResetText>
        <InputFieldContainer>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Username"
            onFocus={this.focusUsername}
          />
          <IconUsername source={this.state.iconUserName} />
          <Text>Check your email once submit</Text>
        </InputFieldContainer>
        <ButtonsContainer>
          <TouchableOpacity onPress={this.handleForgotPassword}>
            <LinearGradient
              colors={["#FF0000", "#6F03DB"]}
              style={LogInButtonStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <LogInButtonText>Reset</LogInButtonText>
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
)(ForgotPassScreen);

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

const ForgotPassScreenImage = styled.Image`
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

const IconUsername = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  bottom: 15px;
  left: 31px;
`;
