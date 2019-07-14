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

//Icons
import * as Icon from "@expo/vector-icons";

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

class CourseScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    searchName: ""
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
          <ScrollView style={{height: "100%"}}>
            <TitleBar>
                  <TouchableOpacity
                    onPress={this.handleAvatar}
                    style={{ position: "absolute", top: 66, left: 300 }}
                  >
                    <Avatar />
                  </TouchableOpacity>

                  <BrowseSub>Browse</BrowseSub>
                  <TheCoursesSub>the Courses</TheCoursesSub>
       

                </TitleBar>
             
                <SearchBarContainer>
                <SearchInput
                    onChangeText={searchName => this.setState({ searchName })}
                    placeholder="Search for any course..."
                    placeholderTextColor="grey"
                    onFocus={this.focusEmail}
                />
                </SearchBarContainer>
                <Icon.Ionicons 
                  name="ios-search"
                  size={20}
                  color="white"
                  style={{ top: 150, left: 40}}
                />
                <Line1>-</Line1>
          {/* First row of cards -------------------------*/}
            <ScrollView  
              horizontal={true}
              style={{ top: 200, left: 15}} 
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

            {/* Second row of cards -------------------------*/}

            <ScrollView  
              horizontal={true}
              style={{ top: 200, left: 15}} 
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
)(CourseScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const SearchBarContainer = styled.View`
  height: 50px;
  top: 166px;
  left: 70px;
`;

const SearchInput = styled.TextInput`
  color: white;
  width: 295px;
  height: 44px;
  font-size: 16px;
  margin-top: 20px;
  border: none;
  line-height: 70px;
`;


const BrowseSub = styled.Text`
  position: absolute;
  top: 120px;
  left: 23px;
  width: 208px;
  height: 106px;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`;

const TheCoursesSub = styled.Text`
  position: absolute;
  top: 170px;
  left: 23px;
  width: 250px;
  height: 106px;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`;

const Line1 = styled.Text`
  position: absolute;
  top: 235px;
  left: 70px;
  width: 270px;
  height: 0;
  border: 1px solid #707070;
`;

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  /* background-color: #f0f3f5; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  top: -50px;
  left: 15px;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: column;
`;


const TempFix = styled.View`
  height: 200px;
  background: white;
  width: 100%;
`

