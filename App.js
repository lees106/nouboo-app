import React from "react";
import AppNavigator from "./navigator/AppNavigator";
import styled from "styled-components";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";

// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "./src/aws-exports";
Amplify.configure(config);

// Apollo
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import TabNavigator from "./navigator/TabNavigator";

const GRAPHCMS_API =
  "https://api-useast.graphcms.com/v1/cjxqug1zq0lm601f0gbwuxfdy/master";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
});

const initialState = {
  action: "",
  username: "",
  name: "Stranger",
  avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return { ...state, username: action.username };
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.avatar };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  </ApolloProvider>
);

export default App;
