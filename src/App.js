import React, { Component } from "react";
import "./App.css";
import 'typeface-roboto';
import Routing from "./Config/Routing";
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo";
class App extends Component {
  
  render() {
    const client = new ApolloClient({
      uri: "http://localhost:5000/graphql",
      credentials: 'include',
    });
    return (
      <ApolloProvider client={client}>
    <Routing/>
    </ApolloProvider>
    );
  }
}

export default App;
