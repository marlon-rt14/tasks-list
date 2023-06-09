import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "https://api.8base.com/clinlqi1b001f08m8ezq06o56",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>
);
