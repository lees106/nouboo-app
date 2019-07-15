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
import CoursesCard from "../components/CoursesCard";

// Graph QL and Apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
              <BodyContainer>
                <TotalCoursesNumberText>Courses: 5</TotalCoursesNumberText>
                <Line2>-</Line2>
                <ScrollView  style={{ top: 100, left: 7, marginBottom: 320}}>
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
                            <CoursesCard
                              key={index}
                              title={card.title}
                              image={{ uri: card.image.url }}
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
              </BodyContainer>
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

const TitleBar = styled.View`
  width: 100%;
  top: -50px;
  left: 15px;
`;

const SearchBarContainer = styled.View`
  height: 50px;
  top: 166px;
  left: 70px;
`;

const SearchInput = styled.TextInput`
  color: white;

  width: 100%;
  height: 100%;
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
  width: 75%;
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

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const BodyContainer = styled.View`
  top: 211px;
  width: 100%;
  height: 760px;
  border-radius: 20px;
  border: 0.5px solid #707070;
  background-color: #3d3d3d;
`;

const TotalCoursesNumberText = styled.Text`
  color: white;
  top: 40px;
  left: 17px;
  position: absolute;
  font-size: 17px;
  font-weight: 700;
`;

const Line2 = styled.Text`
  position: absolute;
  top: 85px;
  left: 17px;
  width: 85%;
  height: 0;
  border: 0.25px solid #707070;
`;