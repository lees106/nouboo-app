import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform
} from "react-native";
import styled from "styled-components";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import Card from "../components/Card";

// Graph QL and Apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Carousel from "../components/Carousel";

const CardsQuery = gql`
  query cards {
    cardses {
      title
      subtitle
      caption
      markdown
      image {
        url
      }
      subtitle
      logo {
        url
      }
    }
  }
`;

const AvatarQuery = gql`
  query avatars {
    avatars {
      image {
        url
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      }),
    openNotif: () =>
      dispatch({
        type: "OPEN_NOTIF"
      })
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS == "android") StatusBar.setBarStyle("dark-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }
  };

  handleAvatar = () => {
    this.props.openMenu();
  };

  render() {
    return (
      <RootView>
        <Menu navigation={this.props.navigation} name={this.props.name} />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>

                <Title>Welcome back,</Title>
                <Name>{this.props.name}</Name>

                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 0, paddingTop: 0 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={AvatarQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;
                    console.log(data.avatars);
                    return (
                      <CardsContainer>
                        {data.avatars.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card
                              });
                            }}
                          >
                            <Carousel image={{ uri: card.image.url }} />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Subtitle>{"CONTINUE LEARNING".toUpperCase()}</Subtitle>

              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30, marginTop: -10 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;
                    console.log(data.cardses);
                    return (
                      <CardsContainer>
                        {data.cardses.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card
                              });
                            }}
                          >
                            <Card
                              key={index}
                              title={card.title}
                              image={{ uri: card.image.url }}
                              subtitle={card.subtitle}
                              caption={card.caption}
                              logo={{ uri: card.logo.url }}
                              markdown={card.markdown}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 30px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  /* background-color: #f0f3f5; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: white;
  /* color: #3c4560; */
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 80px;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
`;
